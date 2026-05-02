import Section from "@/components/Section";

export default function Contact() {
  return (
    <Section id="contact" title="Contact" className="py-12 sm:py-16">
      <form className="grid grid-cols-1 gap-3 sm:max-w-lg">
        <label className="grid gap-1">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">이름</span>
          <input
            name="name"
            required
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30 dark:border-white/15 dark:bg-zinc-900"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">이메일</span>
          <input
            type="email"
            name="email"
            required
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30 dark:border-white/15 dark:bg-zinc-900"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">메시지</span>
          <textarea
            name="message"
            rows={5}
            required
            className="resize-none rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30 dark:border-white/15 dark:bg-zinc-900"
          />
        </label>
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-md dark:bg-zinc-50 dark:text-black"
          aria-live="polite"
        >
          보내기
        </button>
      </form>
    </Section>
  );
}


