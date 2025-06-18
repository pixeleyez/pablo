import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquareHeart, Users, Camera, Sparkles } from "lucide-react";

interface Destination {
  image: string;
  title: string;
  description: string;
}

interface Destinations {
  Madrid: Destination[];
  Tokyo: Destination[];
}

const destinations: Destinations = {
  Madrid: [
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
  Tokyo: [
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
  ]
};

interface Message {
  from: "pablo" | "user";
  text: string;
}

/* Dashboard Menu Component */
function DashboardMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="relative inline-block text-left">
      {/* trigger */}
      <button
        onClick={toggle}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center gap-1 rounded-xl bg-purple-700 px-4 py-2 font-medium text-white
                   shadow-lg hover:bg-purple-800 focus:outline-none m-0"
      >
        Dashboard <ChevronDownIcon size={18} />
      </button>

      {/* dropdown panel */}
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute z-50 w-56 origin-top-left rounded-xl border border-gray-200
                     bg-white p-2 shadow-xl mt-0"
        >
          <MenuLink to="/search">🔍 Search accommodation</MenuLink>
          <MenuLink to="/inbox">📨 Inbox</MenuLink>
          <MenuLink to="/canvas">🖼️ Canvas / Wall</MenuLink>
          <MenuLink to="/editorials">📰 Editorials</MenuLink>
          <MenuLink to="/oka">📝 Oka Editorials</MenuLink>

          <hr className="my-2" />

          <details>
            <summary className="cursor-pointer rounded-lg px-2 py-1 text-sm font-semibold hover:bg-gray-50">
              👤 Profile &amp; Account
            </summary>
            <div className="ml-4 mt-1 flex flex-col gap-1">
              <MenuLink to="/profile">View profile</MenuLink>
              <MenuLink to="/quiz">Quiz &amp; preferences</MenuLink>
              <MenuLink to="/editor-signup">Become an editor</MenuLink>
              <MenuLink to="/reviews">Imported reviews</MenuLink>
              <MenuLink to="/account">Account settings</MenuLink>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

/* tiny helper for consistent styling */
function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block rounded-lg px-2 py-1 text-sm hover:bg-gray-100 focus:bg-gray-100"
    >
      {children}
    </Link>
  );
}


export default function PabloMVPChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "pablo", text: "Hi Sabrina! Where are we headed this time?" },
    { from: "user", text: "Let's try Tokyo." },
    { from: "pablo", text: "Perfect! Updating your experience feed for Tokyo now." }
  ]);

  const [input, setInput] = useState("");
  const [post, setPost] = useState("");
  const [location, setLocation] = useState<keyof Destinations>("Tokyo");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    if (input.toLowerCase().includes("madrid")) setLocation("Madrid");
    if (input.toLowerCase().includes("tokyo")) setLocation("Tokyo");
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "pablo", text: `Got it! Showing top stays and experiences in ${location}.` }
      ]);
    }, 1000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-[#f7f4f1] font-serif text-[#333]">
        {/* Left panel: Main content */}
        <div className="p-8 md:p-12 overflow-y-auto">
          <h1 className="text-4xl font-extrabold mb-6">Hi Sabrina, where to next?</h1>

          {/* Destination Input */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Type a destination... (e.g., Madrid or Tokyo)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-xl px-4 py-2 text-base"
            />
            <Button className="bg-[#5e4b8b] hover:bg-[#4e3b7a] text-white rounded-xl px-6" onClick={sendMessage}>
              Ask Pablo
            </Button>
          </div>

          {/* Listings */}
          <h2 className="text-2xl font-bold mb-4">Recommended for you in {location}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {destinations[location].map((item: Destination, index: number) => (
              <Card key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insider Tips */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Insider Tips</h3>
            <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={location === "Tokyo"
                    ? "https://images.pexels.com/photos/338516/pexels-photo-338516.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    : "https://images.pexels.com/photos/2901211/pexels-photo-2901211.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  }
                  alt="Insider tip"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold text-md">
                    {location === "Tokyo" ? "Exploring Tokyo's Hidden Neighborhoods" : "Madrid's Underground Art Scene"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right panel: Pablo Chat */}
        <div className="p-6 bg-white border-l border-gray-200 flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="Pablo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="text-xl font-bold">Pablo</h2>
            <DashboardMenu />
          </div>
          <ScrollArea className="flex-1 overflow-y-auto border p-4 rounded-xl bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 ${msg.from === "pablo" ? "text-left" : "text-right"}`}>
                <div className={`inline-block px-4 py-2 rounded-xl ${msg.from === "pablo" ? "bg-purple-100" : "bg-green-100"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-xl px-4 py-2 text-base"
            />
            <Button onClick={sendMessage} className="bg-[#5e4b8b] hover:bg-[#4e3b7a] text-white rounded-xl px-6">
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 min-h-screen bg-[#f7f4f1] font-serif text-[#333]">
        {/* bottom div code */}
        <div className="p-6 space-y-6">
          <Tabs defaultValue="feed">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="feed">
                <MessageSquareHeart className="mr-2 h-4 w-4" /> Feed
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="mr-2 h-4 w-4" /> Groups
              </TabsTrigger>
              <TabsTrigger value="create">
                <Camera className="mr-2 h-4 w-4" /> Create Post
              </TabsTrigger>
              <TabsTrigger value="explore">
                <Sparkles className="mr-2 h-4 w-4" /> Discover
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src="/avatars/user1.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm">"Just got back from Portugal. Here are my fav vegan spots in Lisbon!"</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src="/avatars/user2.jpg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Mark R.</p>
                      <p className="text-sm">"Backpacking across the Balkans? Ask me anything!"</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">🌱 Vegan Travelers</p>
                    <p className="text-sm text-muted-foreground">Share plant-based finds from around the globe.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">🎒 Digital Nomads Europe</p>
                    <p className="text-sm text-muted-foreground">Tips, meetups, and work-friendly stays across Europe.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Textarea
                    placeholder="Share your travel story, tip or review..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  />
                  <Input type="file" />
                  <Button disabled={!post}>Post</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explore">
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">Suggested for You</p>
                    <p className="text-sm">Based on your profile: "Eco Stays in Croatia"</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">From Your Groups</p>
                    <p className="text-sm">"Best work cafés in Lisbon" — Digital Nomads Europe</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
} 