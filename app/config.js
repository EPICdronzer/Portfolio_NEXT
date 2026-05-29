export const siteConfig = {
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "vharsh2003@gmail.com",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "+91 8383933578",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "+91 8383933578",
  location: process.env.NEXT_PUBLIC_SITE_LOCATION || "Delhi, India",
  socialLinks: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "#",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#",
    pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST || "#",
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "https://github.com/EPICdronzer",
  },
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dmxl9hnrm",
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "442673639689528",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "XmrsFQkJnN8w2VwXbHNUeJo7QEA",
  },
  mongodb: {
    uri: process.env.MONGO_URL || "mongodb+srv://vharsh2003:vHARSH3081@cluster0.tnpe4.mongodb.net/portfolio?appName=Cluster0",
  },
};
