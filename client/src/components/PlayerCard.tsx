import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FactionSelect } from "@/components/FactionSelect";
import type { Player } from "@shared/schema";
import { useUpdatePlayer, useDeletePlayer } from "@/hooks/use-players";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();
  const [localTotal, setLocalTotal] = useState(player.totalVotes);
  
  // Keep local state in sync when server updates
  useEffect(() => {
    setLocalTotal(player.totalVotes);
  }, [player.totalVotes]);

  const handleFactionChange = (faction: string) => {
    updatePlayer.mutate({ id: player.id, faction });
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value) || 0;
    setLocalTotal(newVal);
  };

  const handleTotalBlur = () => {
    if (localTotal !== player.totalVotes) {
      updatePlayer.mutate({ id: player.id, totalVotes: localTotal });
    }
  };

  const handleVote = (delta: number) => {
    const newCurrent = Math.max(0, player.currentVotes + delta);
    const newTotal = Math.max(0, player.totalVotes - delta);
    
    updatePlayer.mutate({
      id: player.id,
      currentVotes: newCurrent,
      totalVotes: newTotal,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <Card className="glass-panel overflow-hidden relative group">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur transition duration-500 rounded-lg" />
        
        <CardContent className="relative p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1.5 block">
                Faction
              </label>
              <FactionSelect 
                value={player.faction} 
                onSelect={handleFactionChange}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2 -mt-2"
              onClick={() => deletePlayer.mutate(player.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Total Votes Input */}
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-3 h-3" /> Total
              </label>
              <Input
                type="number"
                value={localTotal}
                onChange={handleTotalChange}
                onBlur={handleTotalBlur}
                className="bg-background/50 border-white/10 text-xl font-mono text-center h-12 focus-visible:ring-primary/50"
              />
            </div>

            {/* Current Votes Control */}
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <label className="text-xs uppercase tracking-widest text-primary/80 font-bold mb-2 block text-center">
                Current
              </label>
              
              <div className="flex items-center justify-between gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-primary/30 text-primary hover:bg-primary/20 hover:text-primary hover:border-primary"
                  onClick={() => handleVote(-1)}
                  disabled={player.currentVotes <= 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <span className="text-2xl font-bold font-mono text-white tabular-nums">
                  {player.currentVotes}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-primary/30 text-primary hover:bg-primary/20 hover:text-primary hover:border-primary"
                  onClick={() => handleVote(1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Decorative stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent absolute bottom-0 opacity-50" />
      </Card>
    </motion.div>
  );
}
