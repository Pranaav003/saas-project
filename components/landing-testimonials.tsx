"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const testimonials = [
    {
        name: "Antonio",
        avatar: "/antonio.png",
        title:"Software Engineer",
        description: "Using this tool has been a game changer, saving me time and effort in content creation."
    },
    {
        name: "Aira",
        avatar: "/aira.png",
        title:"Software Enthusiast",
        description: "I love creating websites, and this tool has helped me create content faster and more efficiently."
    },
    {
        name: "Sofia",
        avatar: "/sofia.png",
        title:"Game Designer",
        description: "Genius is a quick and foolproof way to generate assets and ideas for my games."
    },
    {
        name: "Robert",
        avatar: "/robert.png",
        title:"CEO",
        description: "Genius speeds up production and keeps my team on track for high value objectives."
    },
];

const LandingTestimonials = () => {
    return (
        <div className="px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
              <Card key={item.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <div>
                      <div className="inline-flex gap-x-2">
                        <div className = "rounded-full overflow-hidden border border-white">
                          <Image alt="headshot" src = {item.avatar} width={30} height={30}/>
                        </div>
                        <p className="text-lg">{item.name}</p>
                      </div>
                      <p className="text-zinc-400 text-sm">{item.title}</p>
                    </div>
                  </CardTitle>
                  <CardContent className="pt-4 px-0">
                    {item.description}
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )
};

export default LandingTestimonials;
