const DESTINATIONS: Record<string, Destination> = {
  Madrid: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}/pexels-photo-${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Salamanca Loft ${i + 1}`,
      description: "Near Retiro • 2 guests",
    })),
    activities: ["Tapas crawl", "Prado Museum", "Flamenco show"],
    editorial: ["Madrid with kids", "Hidden Madrid", "Foodie guide"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@madridlife${i + 1}`,
    })),
    themeColor: "#fefcfb",
  },
  Tokyo: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}/pexels-photo-${i === 0 ? '2901209' : i === 1 ? '2901210' : i === 2 ? '2901211' : i === 3 ? '2901212' : i === 4 ? '2901213' : '2901214'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Shibuya Studio ${i + 1}`,
      description: "Near station • 3 guests",
    })),
    activities: ["Sushi making", "Robot restaurant", "Temple tour"],
    editorial: ["Tokyo on a budget", "Hidden gems", "Nightlife guide"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@tokyolife${i + 1}`,
    })),
    themeColor: "#faf7f5",
  },
  Lisbon: {
    stays: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}/pexels-photo-${i === 0 ? '338504' : i === 1 ? '338515' : i === 2 ? '338516' : i === 3 ? '338517' : i === 4 ? '338518' : '338519'}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400`,
      title: `Alfama Loft ${i + 1}`,
      description: "River view • 2 guests",
    })),
    activities: ["Fado night", "Pastel de nata", "Tram 28"],
    editorial: ["Lisbon with kids", "Hidden Lisbon", "Foodie guide"],
    influencers: Array.from({ length: 6 }, (_, i) => ({
      image: `https://images.pexels.com/photos/${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}/pexels-photo-${i === 0 ? '415829' : i === 1 ? '415830' : i === 2 ? '415831' : i === 3 ? '415832' : i === 4 ? '415833' : '415834'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200`,
      handle: `@lisboeta${i + 1}`,
    })),
    themeColor: "#f6f4f1",
  },
};

      <header className="relative h-56 w-full overflow-hidden">
        <img
          src={`https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop`}
          alt={dest}
          className="absolute inset-0 h-full w-full object-cover"
        /> 