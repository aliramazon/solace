import Image from "next/image";

interface UserAvatarProps {
  size: "large" | "small";
  shape: "rounded" | "circular";
  alt: string;
  src: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size,
  shape,
  alt,
  src,
}) => {
  const finalSize = size === "large" ? 88 : 48;
  const finalShape = shape === "rounded" ? 12 : 50;
  return (
    <Image
      src={src}
      alt={alt}
      width={finalSize}
      height={finalSize}
      style={{
        borderRadius: finalShape,
        borderStyle: "solid",
        borderWidth: size === "large" ? "4px" : "2px",
        borderColor: "var(--accent-mid)",
      }}
    />
  );
};
