import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayerCard } from "@/components/PlayerCard";
import { usePlayers, useCreatePlayer } from "@/hooks/use-players";
import { Skeleton } from "@/components/ui/skeleton";

export default function VotingPage() {
  const { data: players, isLoading } = usePlayers();
  const createPlayer = useCreatePlayer();

  const handleAddPlayer = () => {
    if (players && players.length >= 8) return;
    
    createPlayer.mutate({
      name: `Player ${(players?.length || 0) + 1}`,
      faction: "", // Empty initially to force selection
      totalVotes: 0,
      currentVotes: 0,
    });
  };

  const isMaxPlayers = players && players.length >= 8;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-primary/80 to-primary/20 neon-text">
              TWILIGHT VOTING
            </h1>
            <p className="text-muted-foreground font-mono uppercase tracking-widest text-sm md:text-base">
              Galactic Council Session Control
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleAddPlayer}
            disabled={isMaxPlayers || createPlayer.isPending}
            className={`
              bg-primary text-primary-foreground font-bold tracking-wide uppercase shadow-lg shadow-primary/20
              hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              ${isMaxPlayers ? 'grayscale' : ''}
            `}
          >
            {createPlayer.isPending ? (
              <span className="animate-pulse">Initializing...</span>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                Add Player {players ? `(${players.length}/8)` : ""}
              </>
            )}
          </Button>
        </header>

        {/* Main Content Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card/30 rounded-lg p-6 h-64 border border-white/5 animate-pulse flex flex-col gap-4">
                <Skeleton className="h-10 w-full bg-white/5" />
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <Skeleton className="h-24 w-full bg-white/5" />
                  <Skeleton className="h-24 w-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : players && players.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
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
