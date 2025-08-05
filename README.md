# Unified Portal - Organization Dashboard

A modern, cross-platform unified portal built with Tamagui for iOS, Android, and Web platforms. This project serves as a comprehensive dashboard for organizational collaboration and resource management.

## 🚀 Features

### Core Dashboard
- **Unified Home Screen**: Overview with quick stats, navigation cards, and recent activity
- **Cross-Platform**: Same codebase runs on iOS, Android, and Web
- **Modern UI**: Built with Tamagui for consistent design across platforms
- **Responsive Design**: Adapts to different screen sizes and orientations

### Team Directory
- **Employee Profiles**: Complete team member information with contact details
- **Search & Filter**: Find colleagues by name, role, skills, or department
- **Status Indicators**: Real-time online/offline status
- **Skills & Expertise**: Tag-based skill system for easy discovery

### Document Management
- **File Browser**: Grid and list view modes for document organization
- **Category Filtering**: Organize by business, product, marketing, etc.
- **Search Functionality**: Find documents by name, category, or author
- **File Actions**: Download, share, and manage documents
- **Usage Analytics**: Track document views and engagement

### Quick Actions
- **Search Portal**: Global search across all content
- **Communication**: Send messages and schedule meetings
- **Document Creation**: Quick access to create new documents
- **Notifications**: Real-time updates and alerts

## 🛠 Tech Stack

- **Framework**: Tamagui (React Native + Web)
- **Language**: TypeScript
- **Platforms**: iOS, Android, Web
- **Architecture**: Monorepo with shared components
- **UI Components**: Tamagui design system
- **Icons**: Lucide React icons
- **State Management**: React hooks
- **Navigation**: Solito (cross-platform routing)

## 📱 Platform Support

- ✅ **iOS**: Native iOS app via Expo
- ✅ **Android**: Native Android app via Expo  
- ✅ **Web**: Next.js web application
- ✅ **Responsive**: Adapts to tablets and different screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- Yarn 4.5.0+
- For mobile development: Expo CLI

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd unified-dashboard
   yarn install
   ```

2. **Build shared packages**:
   ```bash
   yarn build
   ```

### Development

#### Web Development
```bash
# Start web development server
yarn web

# Or for production build
yarn web:prod
```

#### Mobile Development
```bash
# Start Expo development server
yarn native

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

#### Watch Mode (All Platforms)
```bash
# Watch for changes across all platforms
yarn watch
```

## 📁 Project Structure

```
unified-dashboard/
├── apps/
│   ├── expo/          # Mobile app (iOS/Android)
│   └── next/          # Web app
├── packages/
│   ├── app/           # Shared app logic
│   │   ├── features/  # Feature screens
│   │   └── provider/  # App providers
│   ├── ui/            # Shared UI components
│   └── config/        # Tamagui configuration
└── README.md
```

## 🎨 Design System

The portal uses Tamagui's design system with:
- **Consistent Spacing**: Token-based spacing system
- **Color Themes**: Light/dark mode support
- **Typography**: Scalable text components
- **Components**: Reusable UI components
- **Icons**: Lucide icon library

## 🔧 Customization

### Adding New Features
1. Create feature screen in `packages/app/features/`
2. Add navigation in the home screen
3. Update routing configuration
4. Test on all platforms

### Styling
- Use Tamagui tokens for consistent spacing and colors
- Follow the existing component patterns
- Test on different screen sizes

### Platform-Specific Code
- Use `Platform.OS` for platform-specific logic
- Create platform-specific components when needed
- Test thoroughly on all platforms

## 🧪 Testing

```bash
# Run tests
yarn test

# Watch mode
yarn test:watch
```

## 📦 Building for Production

### Web
```bash
yarn web:prod
yarn web:prod:serve
```

### Mobile
```bash
# iOS
yarn ios

# Android  
yarn android
```

## 🤝 Contributing

1. Follow the existing code patterns
2. Test on all platforms (iOS, Android, Web)
3. Use TypeScript for type safety
4. Follow the component structure

## 📄 License

This project is created for the hackathon and demonstrates modern cross-platform development with Tamagui.

## 🎯 Hackathon Goals

- ✅ **Cross-Platform**: Single codebase for iOS, Android, and Web
- ✅ **Modern UI**: Professional dashboard design
- ✅ **Real Features**: Team directory, document management
- ✅ **Scalable**: Monorepo architecture for growth
- ✅ **Production Ready**: TypeScript, testing, build system

---

Built with ❤️ using Tamagui for the hackathon
