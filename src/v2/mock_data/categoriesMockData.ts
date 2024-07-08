import { 
  categoryObject, 
  categoryGroupObject, 
} from "../types/category";

class MockCategories {
  private categories: Array<categoryObject | categoryGroupObject> = [
    {
      id: 82,
      name: 'Transfer',
      description: 'Credit card payments and other transfers',
      is_income: false,
      exclude_from_budget: true,
      exclude_from_totals: true,
      updated_at: '2024-02-28T09:49:03.225Z',
      created_at: '2024-01-28T09:49:03.225Z',
      is_group: false,
      order: 0,
      archived: false,
      group_id: null,
      archived_on: null,
    },
    {
        id: 83,
        name: 'Rent',
        description: 'Monthly Rent',
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.225Z',
        created_at: '2024-01-28T09:49:03.225Z',
        is_group: false,
        order: 0,
        archived: false,
        group_id: null,
        archived_on: null,
      },
      {
        id: 84,
        name: 'Food',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-01-28T09:49:03.238Z',
        is_group: true,
        order: 1,
        archived: false,
        group_id: null,
        archived_on: null,
        children: [315162, 315163, 315164]
      },
      {
        id: 86,
        name: 'Automobile',
        description: 'Auto related categories',
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-01-28T09:49:03.238Z',
        is_group: true,
        order: 2,
        archived: false,
        group_id: null,
        archived_on: null,
        children: [315174, 315175]
      },
      {
        id: 88,
        name: 'W2 Income',
        description: null,
        is_income: true,
        exclude_from_budget: false,
        exclude_from_totals: true,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-01-28T09:49:03.238Z',
        is_group: false,
        order: 3,
        archived: false,
        group_id: null,
        archived_on: null
      },
      {
        id: 315162,
        name: 'Alcohol, Bars',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.066Z',
        is_group: false,
        order: 2,
        archived: false,
        group_id: 84,
        group_name: 'Food',
        archived_on: null,
      },
      {
        id: 315163,
        name: 'Groceries',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.120Z',
        is_group: false,
        order: 3,
        archived: false,
        group_id: 84,
        group_name: 'Food',
        archived_on: null,
      },
      {
        id: 315164,
        name: 'Restaurants',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.146Z',
        is_group: false,
        order: 4,
        archived: false,
        group_id: 84,
        group_name: 'Food',
        archived_on: null,
      },
      {
        id: 315165,
        name: 'Fast Food',
        description: null,
        is_income: false,
        exclude_from_budget: true,
        exclude_from_totals: true,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.146Z',
        is_group: false,
        order: 4,
        archived: true,
        group_id: 84,
        group_name: 'Food',
        archived_on: '2024-02-28T09:49:03.238Z',
      },
      {
        id: 315174,
        name: 'Gasoline',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.146Z',
        is_group: false,
        order: 0,
        archived: false,
        group_id: 86,
        group_name: 'Automobile',
        archived_on: null,
      },
      {
        id: 315175,
        name: 'Auto Maintenance',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.146Z',
        is_group: false,
        order: 1,
        archived: false,
        group_id: 86,
        group_name: 'Automobile',
        archived_on: null,
      },  
      {
        id: 315628,
        name: 'Home Supplies',
        description: null,
        is_income: false,
        exclude_from_budget: false,
        exclude_from_totals: false,
        updated_at: '2024-02-28T09:49:03.238Z',
        created_at: '2024-03-06T20:11:36.146Z',
        is_group: false,
        order: 5,
        archived: false,
        group_id: null,
        archived_on: null,
      },  
    ];

  public getCategoryById(id: number): categoryObject | categoryGroupObject {
    return this.categories.find(category => category.id === id) || null;
  }

  public categoryExists(idOrName: string | number): boolean { 
    if (typeof idOrName === 'string') {
      return this.categories.some((category): boolean => category.name === idOrName);
    } else if (typeof idOrName === 'number') {
      return this.categories.some((category): boolean => category.id === idOrName);
    } 
    return false;
  }

  public categoryIsGroup(idOrCategory: number | categoryObject | categoryGroupObject): boolean { 
    if (typeof idOrCategory === 'number') {
      const category = this.categories.find(category => category.id === idOrCategory);
      return category ? category.is_group : false;
    } else {
      return idOrCategory.is_group;
    }
  }

  public categoryHasGroup(idOrCategory: number | categoryObject | categoryGroupObject): boolean {
    if (typeof idOrCategory === 'number') {
      const category = this.categories.find(category => category.id === idOrCategory);
      return category ? category.group_id !== null : false;
    } else {
      return idOrCategory.group_id !== null;
    }
  }

  public categoryGroupExists(idOrCategory: number | categoryObject | categoryGroupObject): boolean {
    if (typeof idOrCategory === 'number') {
      const category = this.categories.find(category => category.id === idOrCategory);
      return category ? category.is_group : false;
    } else {
      return idOrCategory.is_group;
    }
  }

  public categoryHasChild(idOrCategory: number | categoryObject | categoryGroupObject, child_id: number): boolean {
    if (typeof idOrCategory === 'number') {
      const category = this.categories.find(category => category.id === idOrCategory);
      return category && 'children' in category ? category.children?.includes(child_id) : false;
    } else {
      return 'children' in idOrCategory ? idOrCategory.children?.includes(child_id) : false;
    }
  }

  public generateHydratedChildren(children: number[]): categoryObject[] {
    const hydratedChildren: categoryObject[] = [];

    for (const id of children) {
      const category = this.categories.find(category => category.id === id);
      if ("children" in category) {
        throw new Error(`A Category Group has the id:${id} its children list, ` +
          "but this is also a Category Group.");
      }
      if (category) {
        hydratedChildren.push(category);
      } else {
        throw new Error(`A Category Group has the id:${id} its children list, ` +
          "but this id does not exist in this user's data.")
      }
    }

    return hydratedChildren;
  }

  public generateFlattenedCategories(): (categoryObject | categoryGroupObject)[] {
    return this.categories;
  }

  public generateNestedCategories(hydrate_children: boolean): (categoryObject | categoryGroupObject)[] {
    const nestedCategories: (categoryObject | categoryGroupObject)[] = [];

    for (const category of this.categories) {
      if (category.is_group) {
        if (hydrate_children) {
          const hydratedChildren = this.generateHydratedChildren(category.children || []);
          nestedCategories.push({ ...(category  as categoryGroupObject), 
            hydrated_children: hydratedChildren });
        } else {
          nestedCategories.push(category);
        } 
      } else if (!category.group_id) {
        nestedCategories.push(category);
      }
    }

    return nestedCategories;
  }
}

export const mockCategories = new MockCategories();