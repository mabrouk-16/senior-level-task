import { useEffect, useState } from "react";

function InvoiceDetails() {
  const [details, setDetails] = useState([]);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    async function gteUnitDetails() {
      const getData = await fetch("http://appydev-001-site2.atempurl.com/Unit");
      const result = await getData.json();
      await setUnits([...result]);
      // console.log(result);
      // console.log(units);
      return result;
    }

    async function gteInvoiceDetails() {
      const getData = await fetch(
        "http://appydev-001-site2.atempurl.com/InvoiceDetail"
      );
      const result = await getData.json();
      // await setDetails([...result]);
      // console.log(details);
      const unitList = await gteUnitDetails();
      await concatInvoiceWithDetails(result, unitList);
    }

    async function concatInvoiceWithDetails(detailsList, unitList) {
      detailsList.map((invioceDetail) => {
        for (const val of unitList) {
          if (val.id == invioceDetail.unitNo) {
            invioceDetail.unit = val;
            // console.log(true);
          }
        }
      });
      setDetails([...detailsList]);
      // output
      console.log("here ==== >", details);
    }

    gteInvoiceDetails();
  }, []);
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {details.map((invoice) => {
          return (
            <div
              style={{
                backgroundColor: "#eee",
                width: "300px",
                height: "300px",
                margin: "20px",
              }}
              key={invoice.lineNo}
            >
              <h3>productName {invoice.productName}</h3>
              <p>quantity : {invoice.quantity}</p>
              <p>price : {invoice.price}</p>
              <p>total : {invoice.total}</p>
              <p>expiryDate : {invoice.expiryDate}</p>
              <hr />
              {/* {!invoice.unit && <p>UnitNo : {invoice.unit.id}</p>}
              {!invoice.unit && <p>Unit name : {invoice.unit.name}</p>} */}

            </div>
          );
        })}
      </div>
    </>
  );
}

export default InvoiceDetails;
