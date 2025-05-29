import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
import Link from "next/link";

function Header({ content, langState }) {
  // انیمیشن‌های مختلف
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    color: "#FFFFFF",
    transition: { duration: 0.2 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-between items-center w-full px-2 py-2 sm:py-4 sm:px-6 custom-header-dir"
    >
      {/* لوگو با انیمیشن */}
      <motion.a
        href={langState === "fa" ? "/fa" : "/en"}
        className="flex justify-center sm:w-full sm:max-w-40 lg:w-min items-center px-6 sm:px-8 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={Logo}
          className="w-8 h-8 sm:w-11 sm:h-11"
          width="80"
          height="80"
          alt="Logo"
        />
        <motion.p
          className="text-gradient font-[Poppins] font-bold text-lg sm:text-3xl"
          whileHover={{ scale: 1.1 }}
        >
          HEYSAM
        </motion.p>
      </motion.a>

      {/* منوی نویگیشن با انیمیشن */}
      <motion.ul className="hidden lg:flex gap-6" variants={containerVariants}>
        {[
          { id: "about_us", href: "#hero" },
          { id: "projects", href: "#projects" },
          { id: "our_skills", href: "#skills" },
          { id: "contact_us", href: "#footer" },
        ].map((item) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <a href={item.href}>
              <motion.span
                className={`text-[#BCBCBC] list-item-hover ${
                  langState === "fa" && "text-lg font-bold "
                }`}
              >
                {content[item.id]}
              </motion.span>
            </a>
          </motion.li>
        ))}
      </motion.ul>

      {/* دکمه‌های زبان با انیمیشن */}
      <motion.div className="py-4 px-6" variants={itemVariants}>
        <Link href="/en">
          <motion.button
            className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-[#BCBCBC] ${
              langState === "en" && "border border-[#D7D7D7] rounded-lg"
            }`}
            whileHover={hoverEffect}
            whileTap={{ scale: 0.95 }}
          >
            English
          </motion.button>
        </Link>
        <Link href="/fa">
          <motion.button
            className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-[#BCBCBC] ${
              langState === "fa" && "border border-[#D7D7D7] rounded-lg"
            }`}
            whileHover={hoverEffect}
            whileTap={{ scale: 0.95 }}
          >
            فارسی
          </motion.button>
        </Link>
      </motion.div>
    </motion.header>
  );
}

export default Header;
