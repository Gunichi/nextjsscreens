import * as React from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {

  const { pathname } = useRouter();
const paths = pathname.split('/').filter((x) => x);

const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <Breadcrumb>
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