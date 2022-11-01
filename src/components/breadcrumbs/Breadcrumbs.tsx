import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { NextLink } from "@mantine/next";
import router, { useRouter } from "next/router";


const Breadcrumbs = () => {

  const { pathname } = useRouter();
  const pathId = router.query.id;
  const paths = pathname.split("/").filter((x) => x);

    //Primeira letra maiúscula breadcrumb
    const capitalize = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize="sm"
      fontWeight="medium"
      color="gray.500"
      mb="4"
    >
      {paths.map((path, i) => {
        const isCurrentPath = i === paths.length - 1;
        const href = `/${paths.slice(0, i + 1).join("/")}`;
        return isCurrentPath ? (
          <BreadcrumbItem key={path} isCurrentPage>
            <BreadcrumbLink color="gray.500">{capitalize(path)}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={path}>
            <NextLink href={href} passHref>
              <BreadcrumbLink color="red.500">{capitalize(path)}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;