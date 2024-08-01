import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>The Bride</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Our beautiful bride is [Bride's Name]. She's known for her [positive traits] and loves [hobbies/interests].
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>The Groom</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Our handsome groom is [Groom's Name]. He's admired for his [positive traits] and enjoys [hobbies/interests].
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            [Bride] and [Groom] met [how they met]. After [duration] of dating, they knew they were meant to be together. Now, they're excited to start their new journey as a married couple and can't wait to celebrate with you!
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
