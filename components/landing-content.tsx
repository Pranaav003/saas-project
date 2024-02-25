"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: "Antonio",
        avatar: "A",
        title:"Software Engineer",
        description: "I have been using this tool has been a game changer, saving me time and effort in content creation."
    },
    {
        name: "Pranaav",
        avatar: "P",
        title:"Software Enthusiast",
        description: "I love developing strange images to scare my girlfriend with!"
    },
    {
        name: "Nada",
        avatar: "N",
        title:"Pranaav's Girlfriend",
        description: "Pranaav's great! (I'm being held hostage)"
    },
    {
        name: "Robert",
        avatar: "R",
        title:"CEO",
        description: "Genius speeds up production and keeps my team on track for high value objectives."
    },
];

const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
              <Card key={item.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <div>
                      <p className="text-lg">{item.name}</p>
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

export default LandingContent;
