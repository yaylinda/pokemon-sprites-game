const update = (entities: any[], component: { touches: any[] }) => {

    component.touches.forEach(t => {
        console.log(`[system.update] - t.type: ${t.type}, t.id: ${t.id}`);
    });

    return entities;
};

export { update };