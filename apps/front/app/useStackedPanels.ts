// import { ReactNode, useEffect, useRef } from 'react'

// const useStackedPanels = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const panels = gsap.utils.toArray<HTMLElement>(".panel", containerRef.current);
//       panels.forEach(panel => {
//         ScrollTrigger.create({
//           trigger: panel,
//           start: () =>
//             panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
//           pin: true,
//           pinSpacing: false,
//         });
//       });
//       ScrollTrigger.refresh();
//     }, containerRef);

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       ctx.revert();
//     };
//   }, []);
// }

// export default useStackedPanels
