const categoryImages = {
  floral: "https://images.pexels.com/photos/16986600/pexels-photo-16986600.jpeg",
  herbal: "https://images.pexels.com/photos/5605/drink-leaf-leaves-green.jpg",
  superfood: "https://images.pexels.com/photos/15661863/pexels-photo-15661863.jpeg",
};

export function CategoryArt({ kind }: { kind: "floral" | "herbal" | "superfood" }) {
  const color = kind === "floral" ? "#b8664d" : kind === "herbal" ? "#526e58" : "#c49a53";
  return <div className="glass-surface group relative h-36 overflow-hidden sm:h-44 rounded-[1.25rem] bg-muted">
    <img src={categoryImages[kind]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35 saturate-[.75] mix-blend-multiply transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#f0ebe1]/85 via-[#f0ebe1]/15 to-transparent" />
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" fill="none"><path d="M198 240C195 178 192 115 155 54M197 240C205 169 230 111 278 46" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M182 174C139 155 106 128 79 91M208 160C255 145 290 115 320 76M191 118C161 102 142 81 128 57M223 111C250 93 269 71 282 43" stroke={color} strokeWidth="1.7"/><ellipse cx="79" cy="91" rx="29" ry="12" transform="rotate(38 79 91)" fill={color} fillOpacity=".25"/><ellipse cx="320" cy="76" rx="30" ry="12" transform="rotate(-38 320 76)" fill={color} fillOpacity=".25"/><circle cx="155" cy="54" r="14" fill={color} fillOpacity=".45"/><circle cx="278" cy="46" r="16" fill={color} fillOpacity=".35"/></svg>
    <span className="absolute bottom-4 left-5 font-serif text-xl text-foreground/75">{kind === "floral" ? "Petal & bloom" : kind === "herbal" ? "Leaf & root" : "Nourish within"}</span>
  </div>;
}
