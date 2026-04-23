export default function BackgroundGradient() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-neutral-950 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_30%_200px,#E1E0CC26,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_70%_400px,#E1E0CC1A,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_90%,#E1E0CC14,transparent)]" />
    </div>
  );
}
