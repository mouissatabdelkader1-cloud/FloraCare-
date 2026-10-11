import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, User, RefreshCw, Sparkles } from 'lucide-react';
import { PlantIdentificationResult, ChatMessage } from '../types/plant';

interface BotanistChatModalProps {
  plant?: PlantIdentificationResult | null;
  onClose: () => void;
}

export const BotanistChatModal: React.FC<BotanistChatModalProps> = ({ plant, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: plant
        ? `Hello gardener! I'm your FloraCare Botanical Assistant. I have the full profile for your ${plant.commonName} (${plant.scientificName}). How can I help you care for it today? Feel free to ask about repotting, pruning, winter dormancy, or strange leaf behavior.`
        : "Hello! I'm your master gardening assistant. What plant or gardening questions can I help you resolve today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const suggestedQuestions = plant
    ? [
        `How do I know when my ${plant.commonName} needs repotting?`,
        'Can I propagate this using water or soil?',
        'Why are the tips of the leaves turning brown and dry?',
        'What should I change during winter months?',
      ]
    : [
        'How do I eliminate fungus gnats organically?',
        'What is the ideal soil mix for indoor houseplants?',
        'How can I tell if my plant is overwatered vs underwatered?',
      ];

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || inputQuery;
    if (!question.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/botanist-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          plantContext: plant || undefined,
          chatHistory: messages.slice(-6),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to receive answer.');
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I had trouble processing that botanical inquiry. Please try rephrasing your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] max-h-[700px] shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Botanist Consultation AI
              </h3>
              <p className="text-xs text-stone-500">
                {plant ? `Specialist for ${plant.commonName}` : 'Master horticulturist & plant scientist'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user' ? 'bg-stone-900 text-white' : 'bg-emerald-800 text-white'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-800 border border-stone-200/60'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <span
                  className={`block text-[10px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-stone-400' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-100 rounded-2xl p-4 text-xs text-stone-600 border border-stone-200/60 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>Botanist researching answer...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 sm:px-6 py-2 border-t border-stone-100 bg-stone-50/50 overflow-x-auto scrollbar-hide flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-xs px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-emerald-800 hover:border-emerald-700/50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Bar */}
        <div className="p-4 border-t border-stone-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about watering, light, soil, pests..."
              className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
