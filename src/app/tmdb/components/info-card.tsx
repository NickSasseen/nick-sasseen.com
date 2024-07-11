import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icon, IconNode, LucideProps } from "lucide-react";
import { ReactNode } from "react";

type InfoCardProps = {
  title?: string | ReactNode;
  children: ReactNode;
  icon?: ReactNode;
};

export default function InfoCard({ children, icon, title }: InfoCardProps) {
  return (
    <Card>
      {(title || icon) && (
        <CardHeader>
          <CardTitle className="flex">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
