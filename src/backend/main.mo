import Float "mo:core/Float";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    price : Float;
    currency : Text;
    inStock : Bool;
    region : Text;
  };

  module Product {
    public func compare(
      product1 : Product,
      product2 : Product,
    ) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  type Service = {
    name : Text;
    description : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let products = Map.empty<Nat, Product>();
  let inquires = Map.empty<Nat, Inquiry>();

  // Inquire stuff

  var nextInquireId = 0;

  func newIdInquire() : Nat {
    let id = nextInquireId;
    nextInquireId += 1;
    id;
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, company : Text, message : Text) : async () {
    let id = newIdInquire();
    let inquiry = {
      name;
      email;
      company;
      message;
      timestamp = Time.now();
    };
    inquires.add(id, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquires.values().toArray();
  };

  // Product stuff

  var nextProductId = 1;

  func newIdProduct() : Nat {
    let id = nextProductId;
    nextProductId += 1;
    id;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.category == category;
      }
    ).sort();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  let services = [
    {
      name = "Regulatory Compliance";
      description = "Expert guidance on compliance with global health regulations.";
    },
    {
      name = "Logistics & Distribution";
      description = "Efficient global shipping and inventory management.";
    },
    {
      name = "Technical Support";
      description = "24/7 support for all products and equipment.";
    },
    {
      name = "Custom Solutions";
      description = "Tailored medical device solutions for specific needs.";
    },
  ];

  public query ({ caller }) func getServices() : async [Service] {
    services;
  };

  func initializeProducts() {
    let sampleProducts = [
      {
        name = "Blood Glucose Monitor";
        description = "Portable device for measuring blood glucose levels.";
        category = "Diagnostic Devices";
        price = 49.99;
        currency = "USD";
        inStock = true;
        region = "Global";
      },
      {
        name = "Surgical Scissors";
        description = "High-precision stainless steel surgical scissors.";
        category = "Surgical Instruments";
        price = 29.99;
        currency = "USD";
        inStock = true;
        region = "Europe, Asia";
      },
      {
        name = "ECG Machine";
        description = "Advanced electrocardiogram monitoring equipment.";
        category = "Monitoring Equipment";
        price = 299.99;
        currency = "USD";
        inStock = false;
        region = "Americas, Europe";
      },
      {
        name = "Antibiotic Tablets";
        description = "Broad-spectrum antibiotic medication.";
        category = "Pharmaceuticals";
        price = 19.99;
        currency = "USD";
        inStock = true;
        region = "Global";
      },
      {
        name = "Centrifuge";
        description = "Laboratory equipment for sample separation.";
        category = "Lab Equipment";
        price = 499.99;
        currency = "USD";
        inStock = true;
        region = "Global";
      },
      {
        name = "N95 Respirator Masks";
        description = "High-efficiency particulate air masks.";
        category = "Personal Protective Equipment";
        price = 14.99;
        currency = "USD";
        inStock = true;
        region = "Asia, Europe";
      },
    ];

    for (product in sampleProducts.values()) {
      let id = newIdProduct();
      let productWithId = {
        product with id
      };
      products.add(id, productWithId);
    };
  };

  // Initialize products on actor deployment
  initializeProducts();
};
