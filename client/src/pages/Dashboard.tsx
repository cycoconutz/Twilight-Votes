import { useState } from "react";
import { useSessions } from "@/hooks/use-local-sessions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Play, Trash2, Calendar, Search, Check, ChevronsUpDown } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import agendas from "@/data/agendas";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { sessions, createSession, deleteSession } = useSessions();
  const [newSessionName, setNewSessionName] = useState("");
  const [, setLocation] = useLocation();
  const [lookupOpen, setLookupOpen] = useState(false);
  const [selectedAgendaName, setSelectedAgendaName] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim()) return;
    const session = createSession(newSessionName);
    setNewSessionName("");
    setLocation(`/session/${session.id}`);
  };

  const selectedAgenda = agendas.find(a => a.name === selectedAgendaName);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-primary/40">
            TWILIGHT VOTING
          </h1>
          <p className="text-muted-foreground font-mono tracking-widest uppercase">
            AN AGENDA PHASE TOOL FOR TWILIGHT IMPERIUM
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" /> New Council Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <Input
                  placeholder="Enter Session Name (e.g. Friday Night War)"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="bg-black/20 border-white/10 focus-visible:ring-primary"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 font-bold w-full">
                  CREATE SESSION
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" /> Agenda Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Popover open={lookupOpen} onOpenChange={setLookupOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={lookupOpen}
                    className="w-full justify-between bg-black/20 border-white/10 hover:bg-black/40 h-10"
                  >
                    <span className="truncate">{selectedAgendaName || "Search Agenda..."}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 bg-slate-900 border-white/10">
                  <Command>
                    <CommandInput placeholder="Search agenda..." />
                    <CommandList>
                      <CommandEmpty>No agenda found.</CommandEmpty>
                      <CommandGroup>
                        {agendas.map((agenda) => (
                          <CommandItem
                            key={agenda.id}
                            value={agenda.name}
                            onSelect={(currentValue) => {
                              setSelectedAgendaName(currentValue);
                              setLookupOpen(false);
                            }}
                            className="text-slate-200 data-[selected=true]:bg-primary/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedAgendaName === agenda.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {agenda.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {selectedAgendaName && (
                <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setSelectedAgendaName(null)}>
                  Clear Selection
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <AnimatePresence>
          {selectedAgenda && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="glass-panel border-primary/30 overflow-hidden bg-primary/5">
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-primary font-bold">Agenda Archive</label>
                      <h2 className="text-4xl font-black text-white tracking-tight">{selectedAgenda.name}</h2>
                    </div>
                    <span className="text-xs uppercase font-bold px-3 py-1 bg-primary/20 rounded-full border border-primary/30 text-primary">
                      {selectedAgenda.type}
                    </span>
                  </div>
                  
                  <div className="grid gap-6">
                    {selectedAgenda.forEffect && (
                      <div className="space-y-2">
                        <span className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                          <Check className="w-4 h-4" /> For Effect
                        </span>
                        <p className="text-xl text-slate-200 leading-relaxed font-medium pl-6">
                          {selectedAgenda.forEffect}
                        </p>
                      </div>
                    )}
                    {selectedAgenda.againstEffect && (
                      <div className="space-y-2">
                        <span className="text-destructive font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Against Effect
                        </span>
                        <p className="text-xl text-slate-200 leading-relaxed font-medium pl-6">
                          {selectedAgenda.againstEffect}
                        </p>
                      </div>
                    )}
                    {selectedAgenda.electedEffect && (
                      <div className="space-y-2">
                        <span className="text-accent font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                          <Search className="w-4 h-4" /> Elected Effect
                        </span>
                        <p className="text-xl text-slate-200 leading-relaxed font-medium pl-6">
                          {selectedAgenda.electedEffect}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" /> Active Sessions
          </h2>
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
    </div>
  );
}
