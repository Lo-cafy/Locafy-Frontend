import { Button } from "@/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/ui/dialog";
import { AuthDialog } from "@/Auth/Auth";

export function SignUpButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none shadow-none">
        <AuthDialog startOn="signup" />
      </DialogContent>
    </Dialog>
  );
}
