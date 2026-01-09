import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FactionSelect } from "@/components/FactionSelect";
import type { Player } from "@shared/schema";

interface PlayerCardProps {
  player: Player;
  onUpdate: (updates: Partial<Player>) => void;
  onDelete: () => void;
}

export function PlayerCard({ player, onUpdate, onDelete }: PlayerCardProps) {
  const [localTotal, setLocalTotal] = useState(player.totalVotes);
  
  useEffect(() => {
    setLocalTotal(player.totalVotes);
  }, [player.totalVotes]);

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value) || 0;
    setLocalTotal(newVal);
  };

  const handleTotalBlur = () => {
    if (localTotal !== player.totalVotes) {
      onUpdate({ totalVotes: localTotal });
    }
  };

  const handleVote = (field: "agenda1Votes" | "agenda2Votes", delta: number) => {
    const newCurrent = Math.max(0, (player[field] as number) + delta);
    const newTotal = Math.max(0, player.totalVotes - delta);
    
    onUpdate({
      [field]: newCurrent,
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur transition duration-500 rounded-lg" />
        
        <CardContent className="relative p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1.5 block">
                Faction
              </label>
              <FactionSelect 
                value={player.faction} 
                onSelect={(faction) => onUpdate({ faction })}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2 -mt-2"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="grid gap-2">
              <div className="bg-primary/5 p-2 rounded-lg border border-primary/20">
                <label className="text-[10px] uppercase tracking-tighter text-primary/80 font-bold mb-1 block text-center">
                  Agenda 1
                </label>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda1Votes", -1)} disabled={player.agenda1Votes <= 0}><Minus className="w-3 h-3" /></Button>
                  <span className="text-lg font-bold font-mono">{player.agenda1Votes}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda1Votes", 1)}><Plus className="w-3 h-3" /></Button>
                </div>
              </div>
              <div className="bg-primary/5 p-2 rounded-lg border border-primary/20">
                <label className="text-[10px] uppercase tracking-tighter text-primary/80 font-bold mb-1 block text-center">
                  Agenda 2
                </label>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda2Votes", -1)} disabled={player.agenda2Votes <= 0}><Minus className="w-3 h-3" /></Button>
                  <span className="text-lg font-bold font-mono">{player.agenda2Votes}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda2Votes", 1)}><Plus className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent absolute bottom-0 opacity-50" />
      </Card>
    </motion.div>
  );
}
