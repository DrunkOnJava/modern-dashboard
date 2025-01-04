# Modern Admin Dashboard

A comprehensive admin dashboard built with React, TypeScript, and Supabase, featuring real-time monitoring, user management, and advanced security controls.

## 🌐 Deployment

The application is deployed and running at: [https://clinquant-custard-ea9541.netlify.app](https://clinquant-custard-ea9541.netlify.app)

### Deployment Configuration
- Platform: Netlify
- Build Command: `npm run build`
- Publish Directory: `dist`
- Node.js Version: Latest LTS

### Deployment Notes
- SPA routing configured with `_redirects` file
- Environment variables managed through Netlify UI
- Continuous deployment from main branch pending setup

### Deployment Tasks
- Set up continuous deployment from main branch
- Configure custom domain and SSL
- Set up environment variables in Netlify UI
- Implement monitoring and error tracking
- Add deployment status badges
- Set up automated testing before deployment
- Create staging environment

## 🚀 Features

### Dashboard Menu Bar
- Dynamic card sorting (by title or value)
- Dark/Light mode toggle
- Add new cards with customizable:
  - Title and icon
  - Value range and format
  - Color scheme
  - Display type
- Import/Export dashboard configuration
- Keyboard shortcuts for quick actions
- Profile management
- Dashboard customization panel

### Authentication & Security
- Role-based access control (Admin, Super Admin)
- IP whitelisting
- Session management
- Audit logging
- Two-factor authentication support
- Security policy enforcement

### Admin Features
- User management
- Real-time system monitoring
- API configuration
- Backup and restore
- Activity logging
- System settings

### Dashboard Components
- Real-time metrics
- System alerts
- Performance monitoring
- Resource usage tracking
- API status monitoring
- Card customization:
  - Multiple display types (default, compact, detailed, graph, table, etc.)
  - Dynamic value updates
  - Custom formatting
  - Color themes

### API Integration
- Multiple API provider support
- Secure key management
- Connection monitoring
- Rate limiting
- Error tracking

## 🛠 Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite

### Backend
- Supabase
- PostgreSQL
- Edge Functions
- Real-time subscriptions

### Security
- Row Level Security (RLS)
- API key encryption
- Audit logging
- IP whitelisting

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/admin-dashboard.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and API credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Development Environment Notes
- Ensure proper permissions when installing dependencies
- If using an external drive:
  - Consider installing packages in your home directory first, then copying the node_modules to the project
  - Alternatively, use `npm install --prefix ~/project-name` to install dependencies in your home directory
  - You may need to set appropriate file permissions on the external drive
- TypeScript and React types must be properly installed for full IDE support
- For permission issues:
  - Check drive formatting and permissions
  - Consider using local development directory instead of external drive
  - Use `npm config set prefix` to configure global installation directory

## 🐳 Docker Deployment

1. Build the container:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

3. Monitor logs:
   ```bash
   docker-compose logs -f
   ```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the migrations:
   ```bash
   supabase db push
   ```
3. Set up the required tables and policies

### Environment Variables

Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ALPHAVANTAGE_API_KEY=your_alphavantage_key
VITE_17TRACK_API_KEY=your_17track_key
VITE_OPENWEATHER_API_KEY=your_openweather_key
```

## 🏗 Project Structure

```
src/
├── components/          # Shared UI components
├── features/           # Feature modules
│   ├── admin/         # Admin panel features
│   ├── auth/          # Authentication
│   └── dashboard/     # Dashboard features
├── hooks/             # Custom React hooks
├── lib/              # Library configurations
├── services/         # API services
├── types/            # TypeScript definitions
└── utils/            # Utility functions

supabase/
├── functions/        # Edge functions
└── migrations/       # Database migrations
```

## 🔒 Security

### Row Level Security (RLS)
All tables are protected with RLS policies:
```sql
CREATE POLICY "Users can view own data"
  ON table_name
  FOR SELECT
  USING (auth.uid() = user_id);
```

### API Security
- Encrypted API keys
- Rate limiting
- IP whitelisting
- Audit logging

## 📱 Monitoring

### System Metrics
- CPU usage
- Memory usage
- API request count
- Error rates

### Alerts
- System alerts
- Security alerts
- Performance alerts
- API status alerts

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 📝 Developer Notes

### Recent Updates
- Added comprehensive menu bar functionality
- Implemented card customization features
- Added import/export capabilities
- Enhanced dark mode support
- Added keyboard shortcuts
- Improved type safety and error handling

### TODO
- Implement full import functionality
- Add more card display types
- Enhance profile management features
- Add more keyboard shortcuts
- Improve accessibility features
