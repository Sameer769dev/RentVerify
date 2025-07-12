import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send } from "lucide-react";

const conversations = [
    { id: 1, name: 'John Doe', message: 'Hi, is the downtown loft still available?', avatar: 'https://placehold.co/100x100.png', unread: 2 },
    { id: 2, name: 'Jane Smith', message: 'I would like to schedule a viewing for the suburban house.', avatar: 'https://placehold.co/100x100.png', unread: 0 },
    { id: 3, name: 'Alex Johnson', message: 'Perfect, thank you!', avatar: 'https://placehold.co/100x100.png', unread: 0 },
    { id: 4, name: 'Emily Brown', message: 'What is the pet policy?', avatar: 'https://placehold.co/100x100.png', unread: 1 },
];

const messages = [
    { from: 'other', text: 'Hi, is the downtown loft still available for rent?', time: '10:30 AM' },
    { from: 'me', text: 'Hello! Yes, it is. Are you interested in a viewing?', time: '10:32 AM' },
    { from: 'other', text: 'Yes, I would be. When is a good time?', time: '10:33 AM' },
];

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-4rem)] flex">
            <div className="w-1/3 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold">Messages</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search messages" className="pl-10"/>
                    </div>
                </div>
                <ScrollArea className="flex-grow">
                    {conversations.map(convo => (
                        <div key={convo.id} className="flex items-center gap-4 p-4 border-b hover:bg-secondary cursor-pointer transition-colors">
                            <Avatar>
                                <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint="person" />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-semibold truncate">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{convo.message}</p>
                            </div>
                            {convo.unread > 0 && (
                                <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {convo.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="John Doe" data-ai-hint="person" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                <ScrollArea className="flex-grow p-6 bg-secondary/30">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                {msg.from === 'other' && <Avatar className="h-8 w-8"><AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" /></Avatar>}
                                <Card className={`max-w-md ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                                    <CardContent className="p-3">
                                        <p>{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12 h-12" />
                        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Send Message">
                            <Send className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
