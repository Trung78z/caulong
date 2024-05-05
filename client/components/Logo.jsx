import Image from "next/image";

function Logo({ width, height }) {
  return (
    <Image
      unoptimized
      priority
      src="https://dl.memuplay.com/new_market/img/games.onebutton.badminton.icon.2024-01-10-01-53-39.png"
      alt=""
      width={width || 40}
      height={height || 40}
      style={{ borderRadius: "100%" }}
    />
  );
}

export default Logo;
