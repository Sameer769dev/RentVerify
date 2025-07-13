
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Sparkles, Loader2, Paperclip, Smile } from "lucide-react";
import { generateReplySuggestions } from "@/ai/flows/generate-reply-suggestions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const conversations = [
    { id: 1, name: 'John Doe', message: 'Hi, is the downtown loft still available?', avatar: 'https://placehold.co/100x100.png', unread: 2, time: '10:33 AM', active: true },
    { id: 2, name: 'Jane Smith', message: 'I would like to schedule a viewing...', avatar: 'https://placehold.co/100x100.png', unread: 0, time: 'Yesterday', active: false },
    { id: 3, name: 'Alex Johnson', message: 'Perfect, thank you!', avatar: 'https://placehold.co/100x100.png', unread: 0, time: 'Sun', active: false },
    { id: 4, name: 'Emily Brown', message: 'What is the pet policy?', avatar: 'https://placehold.co/100x100.png', unread: 1, time: 'Jul 10', active: false },
];

const initialMessages = [
    { from: 'other', text: 'Hi, is the downtown loft still available for rent?', time: '10:30 AM' },
    { from: 'me', text: 'Hello! Yes, it is. Are you interested in a viewing?', time: '10:32 AM' },
    { from: 'other', text: 'Yes, I would be. When is a good time?', time: '10:33 AM' },
];

export default function MessagesPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const { toast } = useToast();

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        const message = {
            from: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, message]);
        setNewMessage("");
        setSuggestions([]);
    };

    const handleGetSuggestions = async () => {
        setIsSuggesting(true);
        setSuggestions([]);
        try {
            const conversationHistory = messages
                .slice(-5) // Use last 5 messages for context
                .map(m => `${m.from === 'me' ? 'Owner' : 'Tenant'}: ${m.text}`)
                .join('\n');
            
            const result = await generateReplySuggestions({
                conversationHistory,
                userRole: 'owner' // Assuming the current user is an owner
            });

            if (result.suggestions && result.suggestions.length > 0) {
                setSuggestions(result.suggestions);
            } else {
                 toast({ title: "No suggestions found.", description: "Could not generate relevant suggestions." });
            }
        } catch (error) {
            console.error("Error getting suggestions:", error);
            toast({ title: "Error", description: "Failed to get reply suggestions.", variant: "destructive" });
        } finally {
            setIsSuggesting(false);
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        setNewMessage(suggestion);
        setSuggestions([]);
    }

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 text-foreground">
            <div className="absolute inset-0 bg-mandala z-0"/>
            <div className="container mx-auto max-w-7xl h-[calc(100vh-4rem)] p-0 relative z-10">
                <div className="flex h-full border bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
                        <div className="p-4 border-b">
                            <h1 className="text-2xl font-bold text-primary">Conversations</h1>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                                <Input placeholder="Search messages" className="pl-10 focus:ring-accent" />
                            </div>
                        </div>
                        <ScrollArea className="flex-grow">
                            {conversations.map(convo => (
                                <div key={convo.id} className={cn("flex items-start gap-3 p-4 border-b hover:bg-secondary/50 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md", convo.active && 'bg-accent/20 border-l-4 border-accent')}>
                                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                                        <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint="person" />
                                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold truncate">{convo.name}</p>
                                            <p className="text-xs text-muted-foreground">{convo.time}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{convo.message}</p>
                                    </div>
                                    {convo.unread > 0 && (
                                        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center self-center">
                                            {convo.unread}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {/* Main Chat Area */}
                    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
                        <div className="p-4 border-b flex items-center gap-4 bg-background">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="John Doe" data-ai-hint="person" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-primary text-lg">John Doe</p>
                                <p className="text-sm text-green-500 flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <ScrollArea className="flex-grow p-6 bg-secondary/20">
                            <div className="space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-end gap-3 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.from === 'other' && <Avatar className="h-8 w-8"><AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" /></Avatar>}
                                        <div className={cn("max-w-lg p-3 rounded-2xl shadow-md", msg.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none')}>
                                            <p className="text-base">{msg.text}</p>
                                            <p className={`text-xs mt-1 text-right ${msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t bg-background space-y-2">
                            {isSuggesting && (
                                <div className="flex justify-center items-center h-10 mb-2">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                    <span>Generating smart replies...</span>
                                </div>
                            )}
                            {suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {suggestions.map((s, i) => (
                                        <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestionClick(s)}>{s}</Button>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Button type="button" variant="ghost" size="icon" onClick={handleGetSuggestions} disabled={isSuggesting} aria-label="Suggest Replies">
                                    <Sparkles className="h-5 w-5 text-accent" />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" aria-label="Attach File">
                                    <Paperclip className="h-5 w-5 text-primary" />
                                </Button>
                                <div className="relative flex-grow">
                                <Input 
                                    placeholder="Type a message..." 
                                    className="h-12 rounded-full pr-12" 
                                    value={newMessage} 
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                 <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Add Emoji">
                                    <Smile className="h-5 w-5 text-primary" />
                                </Button>
                                </div>
                                <Button type="submit" size="icon" className="h-12 w-12 rounded-full" aria-label="Send Message">
                                    <Send className="h-5 w-5"/>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
