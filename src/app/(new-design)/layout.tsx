import dynamic from 'next/dynamic';
import { NEW_COLOR_MODE_SCRIPT, NewColorModeProvider } from '@/contexts/useNewColorMode';
import { getAllBlogs, getAllEvents } from '@/libs/markdown';

const ThemeProvider = dynamic(() => import('@/styles/theme-provider'));
const BlogsProvider = dynamic(() => import('@/contexts/useBlogs'));
const EventsProvider = dynamic(() => import('@/contexts/useEvents'));

type NewDesignLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function NewDesignLayout({ children }: NewDesignLayoutProps) {
  const blogs = await getAllBlogs();
  const events = await getAllEvents();

  return (
    <ThemeProvider>
      <script dangerouslySetInnerHTML={{ __html: NEW_COLOR_MODE_SCRIPT }} />
      <NewColorModeProvider>
        <BlogsProvider blogs={blogs}>
          <EventsProvider events={events}>{children}</EventsProvider>
        </BlogsProvider>
      </NewColorModeProvider>
    </ThemeProvider>
  );
}
