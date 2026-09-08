"use client"; 
import React, { useEffect, useState } from "react"; 
import Link from "next/link"; 
import LetterPaper from "@/components/LetterPaper"; 
import Envelope from "@/components/Envelope"; 
import PasswordModal from "@/components/PasswordModal"; 
import PageAmbience from "@/components/PageAmbience"; 
type Meta = { id: string; toName?: string; fromName?: string; hasPassword: boolean }; 
type Letter = { body: string; toName?: string; fromName?: string }; 
export default function LetterPage({ params }: { params: Promise<{ id: string }> }) { 
	const [id, setId] = useState(""); 
	const [meta, setMeta] = useState<Meta | null>(null); 
	const [phase, setPhase] = useState<"loading" | "envelope" | "opening" | "letter" | "notfound">("loading"); 
	const [showModal, setShowModal] = useState(false); 
	const [error, setError] = useState(""); 
	const [letter, setLetter] = useState<Letter | null>(null); 
	useEffect(() => { 
		params.then(async (p) => { 
			setId(p.id); 
			const r = await fetch(`/api/letters/${p.id}`); 
			if (r.ok) { 
				setMeta(await r.json()); 
				setPhase("envelope"); 
			} else setPhase("notfound"); 
		}); 
	}, [params]); 
 
	const unlock = async (password?: string) => { 
		setError(""); 
		const r = await fetch(`/api/letters/${id}/unlock`, { 
			method: "POST", 
			headers: { "Content-Type": "application/json" }, 
			body: JSON.stringify({ password }), 
		}); 
		if (!r.ok) { 
			setError("Unable to open this letter."); 
			return false; 
		}
		setLetter(await r.json()); 
	setShowModal(false); 
	setPhase("opening"); 
		return true; 
	}; 
 
	if (phase === "loading") 
		return ( 
			<main className="paper-texture grid min-h-screen place-items-center"> 
				<h1 className="font-display text-3xl">A letter is waiting</h1> 
			</main> 
		); 
	if (phase === "notfound") 
		return ( 
			<main className="paper-texture grid min-h-screen place-items-center px-6 text-center"> 
				<div> 
					<h1 className="font-display text-5xl">Letter not found</h1> 
					<p className="mt-3 font-serif text-ink-soft">This letter may have been removed, or the link might be incorrect.</p> 
					<Link href="/write" className="mt-6 inline-block text-wax"> 
						Write your own letter → 
					</Link> 
				</div> 
			</main> 
		); 
	if (phase === "letter" && letter) 
		return ( 
			<main className="romantic-bg min-h-screen py-12 px-4"> 
				<PageAmbience variant="letter" className="opacity-20" /> 
				<div className="mx-auto max-w-3xl"> 
					<LetterPaper mode="read" toName={letter.toName} body={letter.body} /> 
				</div> 
			</main> 
		); 
	return ( 
		<main className="romantic-bg flex min-h-screen items-center justify-center px-6"> 
			<PageAmbience variant="letter" /> 
			<div className="relative w-full max-w-xl text-center"> 
				<h1 className="font-display text-5xl">{meta?.toName ? `A letter for ${meta.toName}` : "A letter for you"}</h1> 
				<p className="mt-3 font-serif italic text-ink-soft">Someone took the time to write this just for you</p> 
				{meta?.hasPassword && ( 
					<div className="mx-auto mt-5 inline-flex rounded-full bg-wax/10 px-4 py-2 text-xs text-wax">Sealed with a secret</div> 
				)} 
				<div className="mt-10"> 
					{phase === "opening" ? ( 
						<div className="font-serif italic text-ink-soft animate-pulse-soft">Opening...</div> 
					) : ( 
						<Envelope 
							disabled={phase !== "envelope"} 
							onOpen={() => { 
								// start the unlock flow immediately when opening begins 
								if (meta?.hasPassword) setShowModal(true); 
								else unlock(); 
							}} 
							onOpenComplete={() => setPhase("letter")} 
						/> 
					)} 
				</div> 
	{showModal && <PasswordModal error={error} onCancel={() => setShowModal(false)} onSubmit={async (p) => await unlock(p)} />} 
 
	{phase === "envelope" && ( 
					<button onClick={() => (meta?.hasPassword ? setShowModal(true) : unlock())} className="sr-only"> 
						Open 
					</button> 
				)} 
			</div> 
		</main> 
	); 
}
