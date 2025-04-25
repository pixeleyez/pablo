// MainContentPage.jsx – working MVP with influencers, activities, editorials and chat swap
// -----------------------------------------------------------------------------
import React, { useState, useCallback } from "react";
import { MessageCircle, X as Close } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import clsx from "clsx";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
interface Stay {
  image: string;
  title: string;
  description: string;
}

interface Influencer {
  image: string;
  handle: string;
}

interface Destination {
  stays: Stay[];
  activities: string[];
  editorial: string[];
  influencers: Influencer[];
  themeColor: string;
}

interface Message {
  from: "pablo" | "user";
  text: string;
}

interface DestinationCardProps {
  stay: Stay;
}

interface AdSlotProps {
  i: number;
}

interface InfluencerCardProps {
  inf: Influencer;
}

interface ChatBubbleProps {
  msg: Message;
}

// -----------------------------------------------------------------------------
// Demo content
// -----------------------------------------------------------------------------
const DESTINATIONS: Record<string, Destination> = {
  Tulum: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}/pexels-photo-${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Beach Villa ${i + 1}`,
      description: "Private pool • Bikes included",
    })),
    activities: ["Cenote snorkelling", "Sunrise yoga", "Taco crawl"],
    editorial: ["Family guide to Tulum", "Digital‑nomad beach clubs", "Eco‑friendly retreats"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@beachlife${i + 1}`,
    })),
    themeColor: "#fefcfb",
  },
  Lisbon: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}/pexels-photo-${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Alfama Loft ${i + 1}`,
      description: "River view • Tram 28 nearby",
    })),
    activities: ["Fado night", "Pastel de nata workshop", "Historic tram ride"],
    editorial: ["Hidden Lisbon", "Lisbon with kids", "Fado & food"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@lisboeta${i + 1}`,
    })),
    themeColor: "#faf7f5",
  },
  Kyoto: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}/pexels-photo-${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Machiya House ${i + 1}`,
      description: "Tea‑garden • Near Gion",
    })),
    activities: ["Zen garden tour", "Night ramen crawl", "Geisha district walk"],
    editorial: ["Budget Kyoto", "Cherry‑blossom spots", "Vegetarian Kyoto"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@kyotojourney${i + 1}`,
    })),
    themeColor: "#f6f4f1",
  },
  Madrid: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}/pexels-photo-${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Alfama Loft ${i + 1}`,
      description: "River view • Tram 28 nearby",
    })),
    activities: ["Tapas crawl", "Prado Museum", "Flamenco show"],
    editorial: ["Madrid with kids", "Hidden Madrid", "Foodie guide"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415835' : i === 1 ? '415836' : i === 2 ? '415837' : i === 3 ? '415838' : i === 4 ? '415839' : '415840'}/pexels-photo-${i === 0 ? '415835' : i === 1 ? '415836' : i === 2 ? '415837' : i === 3 ? '415838' : i === 4 ? '415839' : '415840'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@madridlife${i + 1}`,
    })),
    themeColor: "#faf7f5",
  },
};

// -----------------------------------------------------------------------------
// Helper components
// -----------------------------------------------------------------------------
const DestinationCard: React.FC<DestinationCardProps> = ({ stay }) => (
  <Card className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition-shadow">
    <CardContent className="p-0">
      <img src={stay.image} alt={stay.title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{stay.title}</h3>
        <p className="text-sm text-muted-foreground">{stay.description}</p>
      </div>
    </CardContent>
  </Card>
);

const AdSlot: React.FC<AdSlotProps> = ({ i }) => (
  <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-6 text-xs text-gray-500">
    Sponsored #{i + 1}
  </div>
);

const InfluencerCard: React.FC<InfluencerCardProps> = ({ inf }) => (
  <Card className="min-w-[160px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <img src={inf.image} alt={inf.handle} className="h-28 w-full object-cover" />
    <CardContent className="p-3">
      <p className="text-sm font-semibold">{inf.handle}</p>
    </CardContent>
  </Card>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({ msg }) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15 }}
    className={clsx("my-1 text-sm", msg.from === "pablo" ? "text-left" : "text-right")}
  >
    <span
      className={clsx(
        "inline-block max-w-[70%] rounded-xl px-3 py-2",
        msg.from === "pablo" ? "bg-purple-100 text-purple-900" : "bg-green-100 text-green-900"
      )}
    >
      {msg.text}
    </span>
  </motion.div>
);

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------
export default function MainContentPage() {
  
  // state
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "pablo", text: "Hi! I'm Pablo – where to?" }]);
  const [dest, setDest] = useState<keyof typeof DESTINATIONS>("Tulum");
  const [chatOpen, setChatOpen] = useState(false);
  const theme = DESTINATIONS[dest];

  const pushMsg = useCallback((m: Message) => setMessages((all) => [...all, m]), []);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    
    // Find the target destination from the input
    const target = Object.keys(DESTINATIONS).find((k) => text.toLowerCase().includes(k.toLowerCase()));
    
    if (target) {
      // Update stays with new images based on destination
      const newStays = Array.from({ length: 6 }, (_, i) => {
        // Different photo IDs for each destination
        const photoIds = {
          Tokyo: ['338504', '338515', '338516', '338517', '338518', '338519'],
          Madrid: ['2901209', '2901210', '2901211', '2901212', '2901213', '2901214'],
          Tulum: ['338504', '338515', '338516', '338517', '338518', '338519'],
          Lisbon: ['2901209', '2901210', '2901211', '2901212', '2901213', '2901214']
        };

        return {
          image: `https://images.pexels.com/photos/${photoIds[target as keyof typeof photoIds][i]}/pexels-photo-${photoIds[target as keyof typeof photoIds][i]}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
          title: `Beach Villa ${i + 1}`,
          description: target === "Tulum" ? "Private pool • Bikes included" : 
                      target === "Lisbon" ? "River view • Tram 28 nearby" : 
                      target === "Tokyo" ? "Near station • 3 guests" :
                      "Near Retiro • 2 guests",
        };
      });
      
      // Update influencers with new images based on destination
      const newInfluencers = Array.from({ length: 6 }, (_, i) => {
        // Different photo IDs for influencer profiles
        const influencerPhotoIds = {
          Tokyo: ['415829', '415830', '415831', '415832', '415833', '415834'],
          Madrid: ['415835', '415836', '415837', '415838', '415839', '415840'],
          Tulum: ['415829', '415830', '415831', '415832', '415833', '415834'],
          Lisbon: ['415835', '415836', '415837', '415838', '415839', '415840']
        };

        return {
          image: `https://images.pexels.com/photos/${influencerPhotoIds[target as keyof typeof influencerPhotoIds][i]}/pexels-photo-${influencerPhotoIds[target as keyof typeof influencerPhotoIds][i]}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
          handle: `@${target.toLowerCase()}life${i + 1}`,
        };
      });

      // Update activities and editorial based on destination
      const activities = {
        Tokyo: ["Sushi making", "Robot restaurant", "Temple tour"],
        Madrid: ["Tapas crawl", "Prado Museum", "Flamenco show"],
        Tulum: ["Cenote snorkelling", "Sunrise yoga", "Taco crawl"],
        Lisbon: ["Fado night", "Pastel de nata workshop", "Historic tram ride"]
      };

      const editorial = {
        Tokyo: ["Tokyo on a budget", "Hidden gems", "Nightlife guide"],
        Madrid: ["Madrid with kids", "Hidden Madrid", "Foodie guide"],
        Tulum: ["Family guide to Tulum", "Digital‑nomad beach clubs", "Eco‑friendly retreats"],
        Lisbon: ["Hidden Lisbon", "Lisbon with kids", "Fado & food"]
      };

      // Update the destination data
      DESTINATIONS[target] = {
        ...DESTINATIONS[target],
        stays: newStays,
        activities: activities[target as keyof typeof activities],
        editorial: editorial[target as keyof typeof editorial],
        influencers: newInfluencers,
      };

      // Update the destination state
      setDest(target as keyof typeof DESTINATIONS);
    }

    // Add user message and clear input
    pushMsg({ from: "user", text });
    setDraft("");
    
    // Bot reply after a short delay
    setTimeout(() => {
      if (target) {
        pushMsg({ from: "pablo", text: `Great choice – planning ${target} for you now!` });
      } else {
        pushMsg({ from: "pablo", text: "Tell me a city and I'll switch things up." });
      }
    }, 600);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Hero */}
      <header className="relative h-56 w-full overflow-hidden">
        <img
          src={`https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop`}
          alt={dest}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            {dest}
          </motion.h1>
          <p className="mt-1 text-sm">0 % commission • GDPR compliant</p>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen" style={{ backgroundColor: theme.themeColor }}>
        <div className="mx-auto max-w-6xl p-6 md:p-10">
          {/* Chat-trigger search */}
          <div className="mb-6 flex gap-2">
            <Input
              value={draft}
              placeholder="Ask Pablo – try 'Lisbon with Tulum'"
              onChange={(e) => setDraft(e.target.value)}
              onKeyUp={handleKey}
              aria-label="Ask Pablo"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>

          {/* Stays grid */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Top stays</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {theme.stays.map((stay, i) => (
                <React.Fragment key={i}>
                  <DestinationCard stay={stay} />
                  {i % 2 === 1 && <AdSlot i={i / 2} key={`ad-${i}`} />}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Things to do */}
          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">Things to do</h2>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              {theme.activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>

          {/* Influencers */}
          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">Local voices</h2>
            <ScrollArea className="w-full pb-2">
              <div className="flex gap-4 snap-x snap-mandatory">
                {theme.influencers.map((inf, i) => (
                  <InfluencerCard key={i} inf={inf} />
                ))}
              </div>
            </ScrollArea>
          </section>

          {/* Editorial picks */}
          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">Editorial picks</h2>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              {theme.editorial.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Chat button & dialog */}
        <Button
          variant="outline"
          className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg"
          onClick={() => setChatOpen(true)}
        >
          <MessageCircle />
        </Button>
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat with Pablo</h3>
              <Close className="cursor-pointer" onClick={() => setChatOpen(false)} />
            </div>
            <ScrollArea className="h-60">
              <div className="p-2">
                {messages.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} />
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
              <Input
                value={draft}
                placeholder="Type a message..."
                onChange={(e) => setDraft(e.target.value)}
                onKeyUp={handleKey}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
