import { User } from '@/types';

export const mockUser: User = {
  id: '1',
  firstname: 'Amine',
  lastname: 'Moumen',
  email: 'aamine.moumen@outlook.fr',
  password: 'amine1402',
  phone: '0767582095',
  role: 'Développeur Full Stack',
  companyName: 'Kodio Studio',
  websiteDomain: 'www.kodio.studio',
  avatar:
    'https://amine-moumen.lon1.cdn.digitaloceanspaces.com/amine-moumen.webp',
  activityLogo:
    'https://amine-moumen.lon1.cdn.digitaloceanspaces.com/kodio-studio-webclip.webp',
  socials: [
    { platform: 'instagram', username: 'kodio.studio' },
    { platform: 'linkedin', username: 'kodio-studio' },
    // { platform: 'tiktok', username: 'kodio.studio' },
    // { platform: 'facebook', username: 'kodio.studio' },
    // { platform: 'x', username: 'kodio_studio' },
  ],
};
