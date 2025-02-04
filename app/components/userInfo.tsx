import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/TODO/components/ui/avatar";
import { Card, CardContent } from "@/TODO/components/ui/card";
import { Badge } from "@/TODO/components/ui/badge";

interface UserInfoProps {
  name?: string | null;
  email?: string | null;
  role?: string;
  image?: string | null;
}

export default function AccountInfor({
  user,
}: {
  user: UserInfoProps | undefined;
}) {
  if (!user) return null;

  return (
    <Card className="w-auto h-auto mx-5 my-4">
      <CardContent className="flex items-center space-x-4 p-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
          <AvatarFallback>{user?.name?.charAt(0) || ""}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base font-bold">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {user?.role}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
