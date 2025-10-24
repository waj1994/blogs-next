export default function CodeLine({ code }: { code: string }) {
	return (
		<span className="bg-[#8e96aa24] rounded-[4px] py-[3px] px-[6px] text-[#5086a1]">
			{code}
		</span>
	);
}
