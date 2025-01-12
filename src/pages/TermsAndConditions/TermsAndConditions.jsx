import TitleBar from "../../components/TitleBar";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const TermsAndConditions = () => {
  return (
    <motion.div
      className="min-w-[320px] mx-auto"
      initial={{ opacity: 0 }}  // Start with opacity 0 (invisible)
      animate={{ opacity: 1 }}  // Animate to opacity 1 (fully visible)
      exit={{ opacity: 0 }}     // Exit with opacity 0 (fade out on leave)
      transition={{ duration: 1 }} // Control the timing of the animation
    >
      <TitleBar title="スタッフを探す" />
      <p className="mx-6 mt-7 mb-[120px]">
        規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。規約とポリシーが入ります。
      </p>
    </motion.div>
  );
};

export default TermsAndConditions;
