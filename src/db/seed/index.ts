const seed = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/seed", {
      method: "POST",
    });

    if (response.ok) {
      console.log("Seeding completed successfully.");
    } else {
      console.error("Seeding failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error while seeding:", error);
  }
};

seed();
