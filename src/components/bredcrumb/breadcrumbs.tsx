import * as React from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumbs = () => {

  const router = useRouter();
  const currentRoute = router.asPath;

  const paths = currentRoute.split('/').filter((path) => path !== '');

  const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Breadcrumb 
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb="2"
    >
      {paths.map((path, i) => {
        const isCurrentPath = i + 1 === paths.length;
        const href = `/${paths.slice(0, i + 1).join('/')}`;

        return isCurrentPath ? (
          <BreadcrumbItem key={path}>
            <BreadcrumbLink href={href} isCurrentPage>
              {Capitalize(path)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={path}>
            <BreadcrumbLink href={href}>{Capitalize(path)}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;