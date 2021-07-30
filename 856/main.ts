import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { KubernetesProvider, DataKubernetesNamespace,  } from "./.gen/providers/kubernetes";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new KubernetesProvider(this, "kind", {
      configPath: "~/.kube/config"
    });

    const dataNamespace = new DataKubernetesNamespace(this, 'data-namespace', {
      metadata: [
        {
          name: 'kube-system'
        }
      ]
    })
    const namespaceName = dataNamespace.metadata[0].name
    console.log(namespaceName)
  }

  
}

const app = new App();
new MyStack(app, "856");
app.synth();
