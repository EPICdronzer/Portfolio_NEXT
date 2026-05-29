export const siteConfig = {
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "vharsh2003@gmail.com",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "+91 98765 43210",
  location: process.env.NEXT_PUBLIC_SITE_LOCATION || "Delhi, India",
  socialLinks: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "#",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "#",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#",
    pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST || "#",
    vk: process.env.NEXT_PUBLIC_SOCIAL_VK || "#",
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "https://github.com/EPICdronzer",
  },
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name",
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "your_api_key",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
  },
  mongodb: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/portfolio",
  },
};
