import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

export default function LoginDialog({ open, onClose, onLogin }: LoginDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
      setUsername("");
      setPassword("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl">Prijava</DialogTitle>
          <DialogDescription>Vnesite uporabniško ime in geslo za prijavo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Uporabniško ime</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Vnesite uporabniško ime"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Geslo</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vnesite geslo"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!username.trim()}>
            Prijava
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
