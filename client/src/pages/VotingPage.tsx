import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Rocket, ArrowLeft, Search, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayerCard } from "@/components/PlayerCard";
import { useSessions } from "@/hooks/use-local-sessions";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useLocation } from "wouter";
import type { Player } from "@shared/schema";
import { useState, useMemo } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function VotingPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { sessions, updateSession } = useSessions();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const session = useMemo(() => sessions.find(s => s.id === id), [sessions, id]);
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Session not found</p>
        <Button onClick={() => setLocation("/")} data-testid="button-home">Back Home</Button>
      </div>
    );
  }

  const players = session.players;

  const handleAddPlayer = () => {
    if (players.length >= 8) return;
    
    const newPlayer: Player = {
      id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
      name: `Player ${players.length + 1}`,
      faction: "",
      totalVotes: 0,
      agenda1Votes: 0,
      agenda2Votes: 0,
      agenda1Rider: 0,
      agenda2Rider: 0,
    };
    
    updateSession(session.id, { players: [...players, newPlayer] });
  };

  const handleUpdatePlayer = (playerId: number, updates: Partial<Player>) => {
    const newPlayers = players.map(p => 
      p.id === playerId ? { ...p, ...updates } : p
    );
    updateSession(session.id, { players: newPlayers });
  };

  const handleDeletePlayer = (playerId: number) => {
    updateSession(session.id, { players: players.filter(p => p.id !== playerId) });
  };

  const isMaxPlayers = players.length >= 8;

  const selectedAgenda1 = agendas.find(a => a.name === session.agenda1Name);
  const selectedAgenda2 = agendas.find(a => a.name === session.agenda2Name);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} data-testid="link-home">
              <ArrowLeft />
            </Button>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-primary/80 to-primary/20 neon-text" data-testid="text-session-name">
                {session.name.toUpperCase()}
              </h1>
              <p className="text-muted-foreground font-mono uppercase tracking-widest text-sm md:text-base">
                Galactic Council Session Control
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1.5 min-w-[240px]">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Agenda I</label>
              <Popover open={open1} onOpenChange={setOpen1}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open1}
                    className="justify-between bg-black/20 border-white/10 hover:bg-black/40 h-10"
                    data-testid="select-agenda-1"
                  >
                    <span className="truncate">{session.agenda1Name || "Select Agenda I..."}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 bg-slate-900 border-white/10">
                  <Command>
                    <CommandInput placeholder="Search Agenda I..." />
                    <CommandList>
                      <CommandEmpty>No agenda found.</CommandEmpty>
                      <CommandGroup>
                        {agendas.map((agenda) => (
                          <CommandItem
                            key={`agenda1-${agenda.id}`}
                            value={agenda.name}
                            onSelect={(currentValue) => {
                              updateSession(session.id, { agenda1Name: currentValue });
                              setOpen1(false);
                            }}
                            className="text-slate-200 data-[selected=true]:bg-primary/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                session.agenda1Name === agenda.name ? "opacity-100" : "opacity-0"
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
            </div>

            <div className="flex flex-col gap-1.5 min-w-[240px]">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Agenda II</label>
              <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open2}
                    className="justify-between bg-black/20 border-white/10 hover:bg-black/40 h-10"
                    data-testid="select-agenda-2"
                  >
                    <span className="truncate">{session.agenda2Name || "Select Agenda II..."}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 bg-slate-900 border-white/10">
                  <Command>
                    <CommandInput placeholder="Search Agenda II..." />
                    <CommandList>
                      <CommandEmpty>No agenda found.</CommandEmpty>
                      <CommandGroup>
                        {agendas.map((agenda) => (
                          <CommandItem
                            key={`agenda2-${agenda.id}`}
                            value={agenda.name}
                            onSelect={(currentValue) => {
                              updateSession(session.id, { agenda2Name: currentValue });
                              setOpen2(false);
                            }}
                            className="text-slate-200 data-[selected=true]:bg-primary/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                session.agenda2Name === agenda.name ? "opacity-100" : "opacity-0"
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
            </div>

            <Button
              size="lg"
              onClick={handleAddPlayer}
              disabled={isMaxPlayers}
              className={`
                bg-primary text-primary-foreground font-bold tracking-wide uppercase shadow-lg shadow-primary/20
                hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 h-10 px-6 sm:mt-5
                ${isMaxPlayers ? 'grayscale' : ''}
              `}
              data-testid="button-add-player"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Player
            </Button>
          </div>
        </header>

        {/* Agenda Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {selectedAgenda1 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Card className="glass-panel border-primary/20 overflow-hidden" data-testid={`card-agenda-1-${selectedAgenda1.id}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start border-b border-white/5 pb-2">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Active Agenda I</label>
                        <h3 className="text-xl font-bold text-white tracking-tight">{selectedAgenda1.name}</h3>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-primary/20 rounded border border-primary/30 text-primary">{selectedAgenda1.type}</span>
                    </div>
                    <div className="grid gap-3 text-sm">
                      {selectedAgenda1.forEffect && (
                        <div>
                          <span className="text-primary font-bold uppercase text-[9px] tracking-tighter">For: </span>
                          <span className="text-muted-foreground">{selectedAgenda1.forEffect}</span>
                        </div>
                      )}
                      {selectedAgenda1.againstEffect && (
                        <div>
                          <span className="text-destructive font-bold uppercase text-[9px] tracking-tighter">Against: </span>
                          <span className="text-muted-foreground">{selectedAgenda1.againstEffect}</span>
                        </div>
                      )}
                      {selectedAgenda1.electedEffect && (
                        <div>
                          <span className="text-accent font-bold uppercase text-[9px] tracking-tighter">Elected: </span>
                          <span className="text-muted-foreground">{selectedAgenda1.electedEffect}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {selectedAgenda2 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Card className="glass-panel border-primary/20 overflow-hidden" data-testid={`card-agenda-2-${selectedAgenda2.id}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start border-b border-white/5 pb-2">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Active Agenda II</label>
                        <h3 className="text-xl font-bold text-white tracking-tight">{selectedAgenda2.name}</h3>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-primary/20 rounded border border-primary/30 text-primary">{selectedAgenda2.type}</span>
                    </div>
                    <div className="grid gap-3 text-sm">
                      {selectedAgenda2.forEffect && (
                        <div>
                          <span className="text-primary font-bold uppercase text-[9px] tracking-tighter">For: </span>
                          <span className="text-muted-foreground">{selectedAgenda2.forEffect}</span>
                        </div>
                      )}
                      {selectedAgenda2.againstEffect && (
                        <div>
                          <span className="text-destructive font-bold uppercase text-[9px] tracking-tighter">Against: </span>
                          <span className="text-muted-foreground">{selectedAgenda2.againstEffect}</span>
                        </div>
                      )}
                      {selectedAgenda2.electedEffect && (
                        <div>
                          <span className="text-accent font-bold uppercase text-[9px] tracking-tighter">Elected: </span>
                          <span className="text-muted-foreground">{selectedAgenda2.electedEffect}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content Area */}
        {players.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {players.map((player) => (
                <PlayerCard 
                  key={player.id} 
                  player={player} 
                  onUpdate={(updates) => handleUpdatePlayer(player.id, updates)}
                  onDelete={() => handleDeletePlayer(player.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-card/10 border border-white/5 rounded-2xl backdrop-blur-sm">
            <div className="bg-primary/10 p-6 rounded-full ring-1 ring-primary/20">
              <Users className="w-16 h-16 text-primary/50" />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-bold text-white">No Factions Present</h2>
              <p className="text-muted-foreground">
                The council chamber is empty. Add players to begin the voting session for the agenda phase.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleAddPlayer}
              className="border-primary/50 text-primary hover:bg-primary/10"
              data-testid="button-initialize-council"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Initialize Council
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
