const GLOBAL_ORCH_KEY = "R028NKU41PQGYB4TQTEUZ8GRN15ME9HF"

function sendAlert(eventObject, dedup_key, integration_key = GLOBAL_ORCH_KEY) {
    eventObject["routing_key"] = integration_key
    eventObject["event_action"] = "trigger"
    eventObject["dedup_key"] = dedup_key
    console.log(eventObject)
    $.ajax({
          method: "POST",
          url: "https://events.pagerduty.com/v2/enqueue",
          data: JSON.stringify(eventObject)
        }).done(function (response) {
          console.log(response);
    });
}

function trigger() {
    console.log('TRiggggggggggeeeeeeeeeer!!!!!!!!!!')
    console.log(GLOBAL_ORCH_KEY)
    add_error_msg()

    // SQL Monitor alert
    var SQLMonitorPayload = {
        "payload": {
            "summary": "[Critical] Increased Response Time detected - SQL Plan slow on SQLCLUSTER01, High Error Rates",
            "source": "SQLMonitor",
            "severity": "critical",
            "location" : "prod",
            "component": "SQLMonitor",
            "group": "SQLMonitor,Production,eCommerce,Checkout-Tier, PostgreSQL",
            "class": "SQLMonitor"
        },
        "client": "View in SQLMonitor",
        "client_url": "www.SQLMonitor.com",
        "images": [{
            "src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
            "href": "https://acme.pagerduty.com",
            "alt": "This is a sample link"
        }]
    }

    sendAlert(SQLMonitorPayload, "SQLMonitor")
//    setTimeout(function() { sendAlert(newRelicPayload, "NewRelic2"); }, 5000); // send again in 5 seconds
//    setTimeout(function() { sendAlert(newRelicPayload, "NewRelic3"); }, 10000); // and again in 10 seconds
    
    // Send Solarwinds alert
    var solarAlertPayload = {
        "payload": {
            "summary": "Host 'acme-SQLCLUSTER01-sv1-c40 :: 179.21.24.50' Error NETWORK [conn11] Failed to connect to 127.0.0.1:27019, in(checking socket for error after poll), reason: No connection could be made because the target machine actively refused it.",
            "source": "Solarwinds",
            "severity": "error",
            "component": "Accounts",
            "group": "Accounts"
        }
    }
    sendAlert(solarAlertPayload, "Solarwinds")

    var newRelicPayload = {
        "payload": {
            "summary": "[Critical] Increased latency detected on the login page, High Page Load Error rates",
            "source": "New Relic",
            "severity": "critical",
            "group": "Authentication",
            "custom_details": {
                "Priority": "Highest",
                "event_id": "0f5bfc9928a260678",
                "body": "[Critical] Increased load latency detected on the Product Search page, High Error rates. Object Reference Not Set and ADO.NET Connection pool exceeded errors detected",
                "tags": ["aws-prod", "base", "env:prod", "host:farnsworth", "monitor", "pd_az:us-west-2c", "production", "xdb", "xtradb"],
                "AWSAccountId": "84862478935",
                "NewStateValue": "ALARM",
                "OldStateValue": "INSUFFICIENT_DATA",
                "Region": "Europe (Ireland)",
                "hostname":"PROD-ip-10-64-0-111"
            }
        },
        "images": [{
            "src": "https://s3.eu-west-2.amazonaws.com/www.timchinchen.co.uk/DemoImages/NRErrors2.png",
            "href": "https://acme.pagerduty.com",
            "alt": "This is a sample link"
        }]
    }
    
    setTimeout(function() { sendAlert(newRelicPayload, "NewRelic"); }, 1000);

    // Instana alert
    var instanaPayload = {
        "payload": {
            "summary": "Allocatable memory too low",
            "source": "Instana",
            "severity": "warning",
            "location" : "prod", 
            "component": "Instana",  
            "group": "Instana,Production,eCommerce,Kubernetes,Authentication",
            "class": "Instana",   
            "custom_details" : {      
                "information": "Requested Memory to Available Memory Ratio is too low",    
                "suggestion solution": "Tune your Garbage Collector, reduce allocation rate through code changes",    
                "link to component": "https://app.instana.io/#/?snapshotId=rjhkZXdNzegliVVEswMScGNn0YY", 
                "zone": "Prod",    
                "tags": "production, documents, elasticsearch",    
                "load avg": 0.75   
            }    
        },    
        "client": "View in Instana",   
        "client_url": "www.Instana.com",   
        "images": [{   
            "src": "https://images.g2crowd.com/uploads/attachment/file/93659/Screen-Shot-2018-11-15-at-5.29.14-PM.png",   
            "href": "https://acme.instana.com",   
            "alt": "instana"  
        }]  
    }    
    setTimeout(function() { sendAlert(instanaPayload, "Instana"); }, 4000);

    // Dynatrace alert
    var dynatracePayload = {
        "payload": {
            "summary": "High Memory usage on Host AUTHSVR00001",
            "source": "Dynatrace",
            "severity": "warning",
            "location" : "prod",
            "component": "Dynatrace",
            "group": "Dynatrace,Production,eCommerce,Kubernetes,Authentication",
            "class": "Dynatrace",
            "custom_details" : {
                "information": "Requested Memory to Available Memory Ratio is too low",
                "suggestion solution": "Tune your Garbage Collector, reduce allocation rate through code changes",
                "link to component": "www.dynatrace.com",
                "zone": "Prod",
                "tags": "production, documents, elasticsearch",
                "load avg": 0.75
            }
        },
        "client": "View in Dynatrace",
        "client_url": "www.Dynatrace.com",
        "images": [{
            "src": "https://s3.eu-west-2.amazonaws.com/www.timchinchen.co.uk/images/dynatrace.jpg",
            "href": "https://acme.Dynatrace.com",
            "alt": "Dynatrace"
        }]
    }
    setTimeout(function() { sendAlert(dynatracePayload, "Dynatrace"); }, 3000);
    setTimeout(function() { sendAlert(dynatracePayload, "Dynatrace1"); }, 4000);
    setTimeout(function() { sendAlert(dynatracePayload, "Dynatrace2"); }, 6000);

    
    // Datadog alert
    var datadogPayload = {
        "payload": {
            "summary": "Node down - cannot connect to SQLCLUSTER01-sv1-c40",
            "source": "DataDog",
            "severity": "warning",
            "location" : "prod",
            "component": "DataDog",
            "group": "aws-prod, base, env:prod, host:farnsworth, monitor, pd_az:us-west-2c, production, xdb, xtradb, Authentication",
            "class": "DataDog",
            "custom_details" : {
                "information": "History list length is high, which usually indicates that an active but idle transaction is persisting. Go find the transaction (SHOW ENGINE INNODB STATUS, usually the last one listed) and kill it (KILL <thread id>).  @devop-Datadog mysql2.Innodb_history_list_length over role:xdb was > 12500.0 on average during the last 5m. Metric value: 12796.667",
                "ping time": "1500ms",
                "load avg": 0.75
            }
        },
        "client": "View in DataDog",
        "client_url": "www.DataDog.com",
        "images": [{
            "src": "https://p.datadoghq.com/snapshot/view/dd-snapshots-prod/org_1804/2016-01-08/2a82598cc2d67f28542eb218f1094db70657b139.png",
            "href": "https://appp.datadoghq.com/monitors#72563?to_ts=1452282540000&group=host%3Aprod-web-xdb09&from_ts=1452281340000",
            "alt": "Link to DataDog"
        }]
    }
    setTimeout(function() { sendAlert(datadogPayload, "DataDog"); }, 5000);

    // SignalFX Alert
    var signalfxPayload = {
        "payload": {
            "summary": "CPU utilization > 99% - AuthSvr001,AuthSvr002",
            "source": "SignalFX",
            "severity": "warning",
            "location" : "prod",
            "component": "SignalFX",
            "group": "SignalFX,Production,eCommerce,Checkout-Tier,Authentication",
            "class": "SignalFX"
        },
        "client": "View in SignalFX",
        "client_url": "www.SignalFX.com",
        "images": [{
            "src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
            "href": "https://acme.pagerduty.com"

        }]
    }
    setTimeout(function() { sendAlert(signalfxPayload, "SignalFX"); }, 5000);
    setTimeout(function() { sendAlert(signalfxPayload, "SignalFX1"); }, 7000);
    setTimeout(function() { sendAlert(signalfxPayload, "SignalFX2"); }, 9000);

    
    // Zabbix
    var zabbixAlertPayload = {
        "payload": {
            "summary": "java.lang.OutOfMemoryError: Java heap space",
            "source": "Zabbix",
            "severity": "error",
            "location" : "prod",
            "component": "Zabbix",
            "group": "Zabbix,Production,eCommerce,Authentication",
            "class": "Zabbix"
        },
        "client": "View in Zabbix",
        "client_url": "www.zabbix.com",
        "images": [{
              "src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
              "href": "https://acme.pagerduty.com"
        }]
    }
    // setTimeout(function() { sendAlert(zabbixAlertPayload, "Zabbix"); }, 3000);

}

function add_error_msg(){
    var error_html = '<div id="error" class="bar error"><div id="close" class="close"></div><i class="ico">&#9888</i><span>  An unknown authentication error occurred</span></div>'
    $('.modal-body').prepend(error_html)

}

function reset() {
    $('.bar.error').remove()
}