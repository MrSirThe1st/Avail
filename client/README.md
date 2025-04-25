# Avail: Real-Time Availability Display Solution

## Product Overview

Avail is a streamlined solution that allows organizations to display real-time availability to clients without requiring complex booking infrastructure. The system provides two flexible deployment options to meet diverse business needs.

## Deployment Methods

### 1. Website Widget

An embeddable component that organizations can add to their existing websites with a simple code snippet. The widget displays real-time availability directly on the organization's website.

**Key Features:**
- One-line installation with customizable appearance
- Real-time calendar synchronization
- Mobile responsive design
- Clear call-to-action buttons for booking/contact
- Seamless integration with existing websites

### 2. Standalone Availability Page

A dedicated page accessible via a direct link (similar to Linktree) for sharing on social media, email signatures, or anywhere a direct website embed isn't possible.

**Key Features:**
- Custom branded URL (username.avail.com)
- Shareable link for social media profiles
- No website required for the organization
- Analytics tracking

## Calendar Integration

The solution synchronizes with existing calendar and scheduling systems:
- Google Calendar
- Microsoft Outlook/365
- Apple Calendar
- Popular scheduling tools (Calendly, Acuity, etc.)

## Value Proposition

**For Organizations:**
- Reduce scheduling friction
- Save time on back-and-forth communications
- Increase conversion by showing real-time availability

**For Clients:**
- Get instant visibility into available time slots before initiating contact

## Technical Stack

### Core Technologies
- **MERN Stack**: MongoDB, Express.js, React, and Node.js Typescript
- **Authentication**: Auth0
- **Frontend**: Shadcn/UI components built on Radix UI with Tailwind CSS
- **API**: RESTful API with comprehensive documentation
- **Real-time Updates**: WebSocket integration for live availability
- **Caching**: Redis for performance optimization

### Development Tools
- ESLint + Prettier: Code quality and formatting
- GitHub Copilot: AI-assisted development
- NPM: Package management
- Console-ninja: Enhanced debugging

## Development Roadmap

The project aims for an initial working prototype within 2 weeks, focusing on core functionality:

1. Calendar connection and synchronization
2. Basic widget display component
3. Authentication and user management
4. Standalone page functionality
5. UI refinement and customization options
6. Testing and deployment

## Target Industries

While the solution is versatile enough for any appointment-based business, initial focus will be on:
- Professional services (consultants, advisors)
- Personal services (salons, coaches)
- Healthcare practices
- Educational services

System Overview - Revised
Avail will function as a read-only display layer that connects to existing calendar/scheduling systems:

Organization dashboard - Where businesses connect calendars and configure display settings
Public-facing displays - Where clients view (but cannot modify) availability

Core Functionality Flow - Revised

Organizations sign up and connect their calendars (read-only access)
They configure how their availability should be displayed
They receive embed code or a custom link to share
Clients view current availability through these interfaces
The system automatically reflects changes made in the original calendar system

Key Pages & Components - Revised
For Organizations (Admin Side)

Authentication Pages

Sign Up
Sign In
Password Reset


Calendar Connection

OAuth integration with various calendar providers
Read-only permission scopes
Connection status monitoring


Display Configuration

Time window settings (how far ahead to show)
Availability format (specific times vs. general availability)
Business hours definition
Busy/Available threshold settings


Appearance Settings

Widget customization (size, colors, text)
Standalone page branding
Mobile appearance options


Integration

Embed code generator
Direct link management
QR code generation for offline sharing


Basic Analytics

View counts
Traffic sources
User location data



For Clients (Public-Facing)

Widget Component

Simple availability indicator
Potentially expandable for more details
"Contact" or "Learn More" CTA (not direct booking)


Standalone Availability Page

Organization branding
Current availability status
Contact information
Optional: upcoming availability overview



User Flows - Revised
Organization Flow

Sign up → Connect calendar (read-only)
Configure display settings → Get embed code/link
Share link or add widget to website

Client Flow

View availability indicator
Use existing channels to contact the organization if they're available

Technical Considerations - Revised
Calendar Integration

Read-only API access to multiple calendar systems
Regular polling for updates
Caching strategy to minimize API calls

Privacy and Security

No access to calendar event details, just busy/free status
Appropriate scoping of OAuth permissions
Transparency about what data is accessed

Display Flexibility

Configurable levels of detail (just "available/busy" vs. specific hours)
Timezone intelligence for global clients