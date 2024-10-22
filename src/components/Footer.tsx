import React, { useEffect } from 'react';
import {
  FaCartPlus,
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { themeState } from '@/store/atoms';
import { IconType } from 'react-icons';

interface SectionItem {
  type: 'section';
  title: string;
  items: string[];
}

interface IconItem {
  type: 'icon';
  icon: IconType;
}

type FooterItem = SectionItem | IconItem;

interface IconStar {
  icon: IconType;
}

const SocialIcon: React.FC<IconStar> = ({ icon: Icon }) => (
  <Icon className="cursor-pointer hover:text-primary/50" size={30} />
);

const Footer: React.FC = () => {
  const items: FooterItem[] = [
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    { type: 'icon', icon: FaDribbbleSquare },
    {
      type: 'section',
      title: 'Solutions',
      items: ['Analytics', 'Marketing', 'Commerce', 'Insights'],
    },
    {
      type: 'section',
      title: 'Support',
      items: ['FAQ', 'Shipping', 'Returns', 'Order Status', 'Payment Options'],
    },
    {
      type: 'section',
      title: 'Company',
      items: ['About Us', 'Get App', 'Careers', 'Affiliate Programs'],
    },
    {
      type: 'section',
      title: 'Legal',
      items: ['Claim', 'Policy', 'Terms'],
    },
  ];

  const theme = useRecoilValue(themeState);

  useEffect(() => {
    document.body.setAttribute('class', `${theme} bg-background`);
  }, [theme]);

  return (
    <div
      className={`bg-backgrounds transition-all duration-300 mx-auto py-14 px-6 grid lg:grid-cols-3 gap-8 z-30 text-text/90 `}
    >
      <div>
        <div className="flex w-full">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl pr-2 font-bold text-primary">
            CORECART
          </h1>
          <FaCartPlus className='text-3xl text-primary my-auto' />
        </div>
        <p className="py-4 font-thin">
          CoreCart is the best e-commerce platform out there—easy to use,
          aesthetically pleasing, and a vendor-first platform.
        </p>
        <div className="flex justify-between  md:w-[75%] my-6">
          {items
            .filter((item): item is IconItem => item.type === 'icon')
            .map((item, index) => (
              <SocialIcon key={index} icon={item.icon} />
            ))}
        </div>
      </div>

      <div className="lg:col-span-2 flex justify-between mt-6">
        {items
          .filter((item): item is SectionItem => item.type === 'section')
          .map((item, index) => (
            <div key={index}>
              <h6 className="font-medium text-text cursor-default text-xl">
                {item.title}
              </h6>
              <ul>
                {item.items.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="py-2 cursor-pointer text-text/80 font-normal hover:text-primary/60 text-sm"
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Footer;
