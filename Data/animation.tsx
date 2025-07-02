export const FadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
};
export const FadeUpAnimate = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
};
export const opacity = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.5 },
};
 
export const opacityAnimate ={
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}