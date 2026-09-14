export function StoryIllustration({ scene }: { scene: "friends" | "garden" }) {
  const garden = scene === "garden";
  return <div className={`relative h-56 overflow-hidden rounded-[1.5rem] sm:h-72 ${garden ? "bg-[#dbe5d5]" : "bg-[#e9ded3]"}`}>
    <svg viewBox="0 0 420 300" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M0 238C90 218 172 230 252 219C326 209 369 216 420 202V300H0V238Z" fill={garden ? "#aabf9e" : "#c98d70"} fillOpacity=".42" />
      <path d="M0 208C92 193 171 201 250 190C324 179 377 187 420 174" stroke={garden ? "#6d8b68" : "#a86a54"} strokeWidth="2" />
      {garden ? <><path d="M88 252C94 213 104 176 121 133M97 216C77 197 67 180 63 158M104 190C122 175 134 159 140 143" stroke="#557758" strokeWidth="3"/><path d="M300 254C294 214 286 173 271 130M292 212C312 192 319 174 321 153M285 190C266 173 255 156 250 139" stroke="#557758" strokeWidth="3"/><circle cx="121" cy="133" r="15" fill="#b8664d" fillOpacity=".75"/><circle cx="271" cy="130" r="14" fill="#c49a53" fillOpacity=".8"/><path d="M55 247C52 218 55 198 66 177M344 249C346 221 342 201 330 180" stroke="#557758" strokeWidth="2"/></> : <><path d="M84 244L92 157M146 242L152 152" stroke="#526e58" strokeWidth="3"/><circle cx="93" cy="139" r="19" fill="#526e58"/><circle cx="153" cy="134" r="19" fill="#b8664d"/><path d="M92 166L67 207L98 225M93 166L119 205L98 225M153 161L130 202L158 221M153 161L177 203L158 221" stroke="#384f40" strokeWidth="4" strokeLinecap="round"/><path d="M79 182L112 181M139 179L170 179" stroke="#384f40" strokeWidth="3" strokeLinecap="round"/><path d="M245 237C257 212 274 191 297 180M281 233C297 211 320 199 348 197" stroke="#557758" strokeWidth="3"/><circle cx="297" cy="180" r="9" fill="#b8664d"/><circle cx="348" cy="197" r="8" fill="#c49a53"/></>}
      <circle cx="362" cy="54" r="27" fill={garden ? "#f3e8bf" : "#f4e6c7"} fillOpacity=".75" />
      <path d="M23 56C36 47 51 42 66 45M23 69C39 60 51 58 67 60" stroke="#ffffff" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span className="absolute bottom-4 left-4 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-foreground/60">{garden ? "Learning from the land" : "Two friends, one beginning"}</span>
  </div>;
}
