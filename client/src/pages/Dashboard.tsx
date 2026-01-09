import { useState } from "react";
import { useSessions } from "@/hooks/use-local-sessions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Play, Trash2, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { sessions, createSession, deleteSession } = useSessions();
  const [newSessionName, setNewSessionName] = useState("");
  const [, setLocation] = useLocation();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim()) return;
    const session = createSession(newSessionName);
    setNewSessionName("");
    setLocation(`/session/${session.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-primary/40">
            TWILIGHT VOTING
          </h1>
          <p className="text-muted-foreground font-mono tracking-widest uppercase">
            Multiverse Session Manager
          </p>
        </header>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> New Council Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="flex gap-4">
              <Input
                placeholder="Enter Session Name (e.g. Friday Night War)"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                className="bg-black/20 border-white/10 focus-visible:ring-primary"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 font-bold px-8">
                CREATE
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <AnimatePresence>
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
                  onClick={() => setLocation(`/session/${session.id}`)}
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {session.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(session.createdAt).toLocaleDateString()}
                        </span>
                        <span>{session.players.length} Players</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" onClick={() => deleteSession(session.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <Button size="icon" onClick={() => setLocation(`/session/${session.id}`)} className="bg-primary/20 text-primary hover:bg-primary hover:text-white">
                        <Play className="w-5 h-5 fill-current" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {sessions.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-muted-foreground font-mono italic">No active sessions detected in memory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
