import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import abi from "../../constants/abi.json";
import { useState } from "react";

function RegisterGame() {
    const contractAddress = "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";
    const { address: walletAddress, isConnected } = useAccount();
    const { writeContractAsync, isPending, error } = useWriteContract();

    const [form, setForm] = useState({
        name: "",
        logo: "",
        url: "",
        description: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await writeContractAsync({
                address: contractAddress,
                abi,
                functionName: "registerGame",
                args: [
                    walletAddress, // _game
                    form.name, // _name
                    form.logo, // _image
                    form.url, // _url
                ],
            });

            setSuccess(true);
        } catch (err) {
            console.error("Register error:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center">
            <Gamepad2 className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your game not registered</h2>
            <p className="text-gray-500 max-w-sm">
                If your game is ready to be played, please register it to make it
                available for players.
            </p>

            <section className="w-full backdrop-blur-md mt-6">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-5 text-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button disabled={!isConnected}>Register Game</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Register New Game</DialogTitle>
                                    <DialogDescription>
                                        Fill in your game details to register on Monad Game ID.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="address-1">Game Address</Label>
                                        <Input
                                            id="address-1"
                                            name="address"
                                            disabled
                                            value={walletAddress || ""}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name-1">Game Name</Label>
                                        <Input
                                            id="name-1"
                                            name="name"
                                            placeholder="Your game name"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="logo-1">Game Logo URL</Label>
                                        <Input
                                            id="logo-1"
                                            name="logo"
                                            placeholder="https://www.yourgame.com/logo.png"
                                            value={form.logo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="url-1">Game URL</Label>
                                        <Input
                                            id="url-1"
                                            name="url"
                                            placeholder="https://play.yourgame.com"
                                            value={form.url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description-1">Description</Label>
                                        <Input
                                            id="description-1"
                                            name="description"
                                            placeholder="Your game description"
                                            value={form.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-sm text-red-500 mt-2">
                                        Error: {error.shortMessage || error.message}
                                    </p>
                                )}
                                {success && (
                                    <p className="text-sm text-green-600 mt-2">
                                        ✅ Game registered successfully! Please refresh the page. It may take a few minutes for your game to appear.
                                    </p>
                                )}

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        disabled={isPending || success}
                                    >
                                        {isPending
                                            ? "Registering..."
                                            : success
                                                ? "Complete"
                                                : "Confirm"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </div>
    );
}

export default RegisterGame;


