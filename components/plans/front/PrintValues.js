import classes from "./plans-front.module.css";

import React from "react";
import Button from "../../ui/Button";
import jsPDF from "jspdf";
import Modal from "../../ui/Modal";
import { Table } from "react-bootstrap";
import { AiFillPrinter } from "react-icons/ai";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import Image from "next/image";

const PrintValues = (props) => {
  const value = props.value;

  const generatePdf = () => {
    // const doc = new jsPDF("p", "pt", "a4");
    // doc.setLanguage("fa");
    // doc.addFont("FontsFree-Net-ir_sans.ttf", "iranFont", "normal");
    // doc.setFont("Arial");
    // doc.text("امیر محمد محمدی", 10, 10);
    // doc.save("test.pdf");
    // // doc.html(document.querySelector("#content"), {
    // //   callback: function (pdf) {
    // //     pdf.save("list.pdf");
    // //   },
    // // });
    window.print();
  };

  let basicSum = 0;
  for (let i = 0; i < value.basic.length; i++) {
    basicSum += +value.basic[i].price;
  }

  let offerSum = 0;
  for (let i = 0; i < value.offer.length; i++) {
    offerSum += +value.offer[i].price;
  }

  let specialSum = 0;
  for (let i = 0; i < value.special.length; i++) {
    specialSum += +value.special[i].price;
  }

  const allSum = basicSum + offerSum + specialSum;
  const finalSum = allSum + allSum * 0.09;

  let finalStr = finalSum.toString().split(".");
  if (finalStr[0].length >= 5) {
    finalStr[0] = finalStr[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (finalStr[1] && finalStr[1].length >= 5) {
    finalStr[1] = finalStr[1].replace(/(\d{3})/g, "$1 ");
  }

  let allStr = allSum.toString().split(".");
  if (allStr[0].length >= 5) {
    allStr[0] = allStr[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (allStr[1] && allStr[1].length >= 5) {
    allStr[1] = allStr[1].replace(/(\d{3})/g, "$1 ");
  }

  return (
    <Modal className={`whiteSec ${classes.modalSec}`}>
      <div className={classes.print}>
        <div className={classes.logoPrint}>
          <Image
            width={90}
            height={60}
            alt="touska-web"
            src="/images/logo.png"
          />
        </div>
        <h2 className="text-center mb-4">پیش فاکتور</h2>
        <div className={classes.valuesItem}>
          <h3>امکانات پایه</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.basic.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.valuesItem}>
          <h3>امکانات پیشنهادی</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.offer.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.valuesItem}>
          <h3>امکانات تخصصی</h3>
          <Table striped bordered hover className={classes.specialTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.special.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.price}>
          <h5>
            <span>هزینه کلی: </span>
            {allStr} تومان
          </h5>
          <h5 dir="rtl">
            <span>ارزش افزوده: </span>
            9%
          </h5>
          <h5>
            <span>هزینه کلی: </span>
            {finalStr} تومان
          </h5>
        </div>
        <AiFillPrinter
          className={classes.printBtn}
          onClick={() => window.print()}
        />
        <MdOutlineKeyboardReturn
          onClick={props.backStep1}
          className={classes.back}
        />
      </div>
    </Modal>
  );
};

export default PrintValues;
