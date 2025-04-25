import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Stay {
  image: string;
  title: string;
  description: string;
}

interface Destination {
  stays: Stay[];
  activities: string[];
  editorial: string[];
  themeColor: string;
}

interface Destinations {
  Madrid: Destination;
  Tokyo: Destination;
  Lisbon: Destination;
}

interface Message {
  from: "pablo" | "user";
  text: string;
}

const destinations: Destinations = {
  Madrid: {
    stays: [
      { 
        image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "Charming Flat in Madrid", 
        description: "Centrally located with a view of Plaza Mayor." 
      },
      { 
        image: "https://images.pexels.com/photos/2901210/pexels-photo-2901210.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "Tapas Tour", 
        description: "Explore local tapas bars with a guide." 
      }
    ],
    activities: ["Sunset rooftop drinks", "Contemporary art walk", "Tapas hopping tour"],
    editorial: ["Family Travel in Madrid", "Hidden Neighborhoods to Explore", "Art & Food Tour on a Budget"],
    themeColor: "#f1ece6"
  },
  Tokyo: {
    stays: [
      { 
        image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "Tokyo Capsule Hotel", 
        description: "Minimalist stay in Shinjuku." 
      },
      { 
        image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "Sushi Masterclass", 
        description: "Learn to make sushi with a Tokyo chef." 
      }
    ],
    activities: ["Cherry blossom biking", "Robot show", "Night ramen crawl"],
    editorial: ["Traveling Tokyo with Kids", "Nightlife Beyond Shibuya", "Vegan Eats in Tokyo"],
    themeColor: "#f3f0eb"
  },
  Lisbon: {
    stays: [
      { 
        image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "Alfama View Apartment", 
        description: "Rustic charm with river views." 
      },
      { 
        image: "https://images.pexels.com/photos/2901210/pexels-photo-2901210.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
        title: "TimeOut Market Tour", 
        description: "Sample Lisbon's best bites." 
      }
    ],
    activities: ["Fado night", "Pastel de nata baking class", "Tram 28 historic ride"],
    editorial: ["Hidden Gems of Lisbon", "Traveling with Kids in Portugal", "Fado and Food: A Lisbon Story"],
    themeColor: "#f7f4f1"
  }
};

export default function OkaMVP() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "pablo", text: "Hi Sabrina! Where are we headed this time?" }
  ]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<keyof Destinations>("Tokyo");
  const [memory, setMemory] = useState({ likes: ["family-friendly", "food"] });
  const [showProfile, setShowProfile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const current = destinations[location];

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const match = Object.keys(destinations).find(city => input.toLowerCase().includes(city.toLowerCase())) as keyof Destinations | undefined;
      if (match) {
        setLocation(match);
        setMessages(prev => [...prev, { from: "pablo", text: `Planning ${match} for you — want to include ${memory.likes.join(", ")} again?` }]);
      } else {
        setMessages(prev => [...prev, { from: "pablo", text: `Noted. Let's customize your experience.` }]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 min-h-screen font-serif text-[#333]" style={{ backgroundColor: current.themeColor }}>
      {/* Left/Main Panel */}
      <div className="col-span-2 p-6 md:p-10 overflow-y-auto">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-2">Where to next, Sabrina?</h1>
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g., Lisbon with 3 kids, food and beaches" />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>

        <motion.div key={location} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mt-4 mb-3">Top stays in {location}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {current.stays.map((stay: Stay, i: number) => (
              <Card key={i} className="bg-white shadow rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <img src={stay.image} alt={stay.title} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold text-lg">{stay.title}</h3>
                    <p className="text-sm text-gray-600">{stay.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-2">Things to do</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-6">
            {current.activities.map((act: string, i: number) => <li key={i}>{act}</li>)}
          </ul>

          <h3 className="text-xl font-semibold mb-2">Articles & Editorials</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {current.editorial.map((art: string, i: number) => <li key={i}>{art}</li>)}
          </ul>
        </motion.div>
      </div>

      {/* Right Sidebar: Pablo Chat + Dropdown */}
      <div className="bg-white p-4 border-l border-gray-200 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" alt="Pablo" className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-bold">Pablo</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md p-1 border hover:bg-gray-100"><MoreHorizontal /></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem onClick={() => setShowProfile(!showProfile)}>Profile & Preferences</DropdownMenuItem>
              <DropdownMenuItem>My Trips</DropdownMenuItem>
              <DropdownMenuItem>Saved Places</DropdownMenuItem>
              <DropdownMenuItem>Inbox</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ScrollArea className="flex-1 px-2">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`my-2 text-sm ${msg.from === 'pablo' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block px-3 py-2 rounded-xl ${msg.from === 'pablo' ? 'bg-purple-100' : 'bg-green-100'}`}>{msg.text}</div>
            </motion.div>
          ))}
          {isTyping && <div className="text-purple-400 italic animate-pulse mt-2">Pablo is typing…</div>}
        </ScrollArea>

        <div className="mt-3 flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Pablo…" />
          <Button onClick={sendMessage}>Send</Button>
        </div>

        {showProfile && (
          <div className="mt-4 text-sm border-t pt-3">
            <h4 className="font-semibold mb-1">Your Preferences</h4>
            <p className="text-gray-600 mb-2">{memory.likes.join(", ")}</p>
            <Button variant="outline" size="sm" onClick={() => setMemory({ likes: ["romantic", "design hotels"] })}>Update</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
} 