import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FactionSelect } from "@/components/FactionSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
    const isLocked = field === "agenda1Votes" ? player.agenda1Rider === 1 : player.agenda2Rider === 1;
    if (isLocked) return;

    const newCurrent = Math.max(0, (player[field] as number) + delta);
    const newTotal = Math.max(0, player.totalVotes - delta);
    
    onUpdate({
      [field]: newCurrent,
      totalVotes: newTotal,
    });
  };

  const handleReset = () => {
    onUpdate({
      totalVotes: 0,
      agenda1Votes: 0,
      agenda2Votes: 0,
      agenda1Rider: 0,
      agenda2Rider: 0,
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
              data-testid="button-delete-player"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
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
                  data-testid="input-total-votes"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full h-8 text-xs gap-2 border-white/10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
                data-testid="button-reset-player"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Fields
              </Button>
            </div>

            <div className="grid gap-2">
              <div className="bg-primary/5 p-2 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-tighter text-primary/80 font-bold block text-center flex-1">
                    Agenda 1
                  </label>
                  <div className="flex items-center gap-1">
                    <Checkbox 
                      id={`rider1-${player.id}`}
                      checked={player.agenda1Rider === 1}
                      onCheckedChange={(checked) => onUpdate({ agenda1Rider: checked ? 1 : 0 })}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={`rider1-${player.id}`} className="text-[9px] uppercase font-bold text-muted-foreground cursor-pointer">Rider</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda1Votes", -1)} disabled={player.agenda1Votes <= 0 || player.agenda1Rider === 1} data-testid="button-minus-agenda1"><Minus className="w-3 h-3" /></Button>
                  <span className={cn("text-lg font-bold font-mono", player.agenda1Rider === 1 && "opacity-50")} data-testid="text-agenda1-votes">{player.agenda1Votes}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda1Votes", 1)} disabled={player.agenda1Rider === 1} data-testid="button-plus-agenda1"><Plus className="w-3 h-3" /></Button>
                </div>
              </div>
              <div className="bg-primary/5 p-2 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-tighter text-primary/80 font-bold block text-center flex-1">
                    Agenda 2
                  </label>
                  <div className="flex items-center gap-1">
                    <Checkbox 
                      id={`rider2-${player.id}`}
                      checked={player.agenda2Rider === 1}
                      onCheckedChange={(checked) => onUpdate({ agenda2Rider: checked ? 1 : 0 })}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={`rider2-${player.id}`} className="text-[9px] uppercase font-bold text-muted-foreground cursor-pointer">Rider</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda2Votes", -1)} disabled={player.agenda2Votes <= 0 || player.agenda2Rider === 1} data-testid="button-minus-agenda2"><Minus className="w-3 h-3" /></Button>
                  <span className={cn("text-lg font-bold font-mono", player.agenda2Rider === 1 && "opacity-50")} data-testid="text-agenda2-votes">{player.agenda2Votes}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleVote("agenda2Votes", 1)} disabled={player.agenda2Rider === 1} data-testid="button-plus-agenda2"><Plus className="w-3 h-3" /></Button>
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
